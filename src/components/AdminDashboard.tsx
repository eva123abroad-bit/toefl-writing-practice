import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ArrowLeft,
  Calendar,
  Mail,
  User as UserIcon,
  Plus,
  Trash2,
  BookOpen,
  Settings,
  Save,
  MessageSquare,
  LayoutDashboard,
  Key,
  Copy,
  RefreshCw,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './lib/utils';
import { QuestionSet, Question } from '../types';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, setDoc, doc, deleteDoc, query, orderBy, limit, Timestamp, serverTimestamp } from 'firebase/firestore';

interface QuizResult {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  setId: string;
  setName: string;
  score: number;
  totalQuestions: number;
  correctCount?: number;
  timeSpent: number;
  completedAt: string;
  details: {
    questionId?: number;
    isCorrect: boolean;
    userAnswer: string | string[];
    correctAnswer: string | string[];
  }[];
}

interface ActivationCode {
  id: string;
  code: string;
  used: boolean;
  type: string;
  status: 'unused' | 'used';
  usedBy?: string;
  usedAt?: string;
  createdAt: string;
}

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [sets, setSets] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [activationCodes, setActivationCodes] = useState<ActivationCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'sets' | 'students' | 'codes'>('overview');
  const [studentFilter, setStudentFilter] = useState<'all' | 'pro' | 'free'>('all');
  const [selectedQuestion, setSelectedQuestion] = useState<{set: any, question: any, idx: number} | null>(null);
  
  // New Set Form State
  const [editingSetId, setEditingSetId] = useState<string | null>(null);
  const [newSetName, setNewSetName] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [bulkText, setBulkText] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [newQuestions, setNewQuestions] = useState<Partial<Question>[]>(
    Array(10).fill(null).map((_, i) => ({
      id: i + 1,
      isFree: true,
      conversation: {
        speaker1: { avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Speaker${i}`, text: '' },
        speaker2: { avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Speaker${i+10}` }
      },
      template: '',
      correctSentence: [],
      words: []
    }))
  );

  const handleBulkParse = () => {
    if (!bulkText.trim()) return;

    // Split by "题目 X" or "题目X" (case insensitive)
    const blocks = bulkText.split(/题目\s*\d+[\.．:：]?/i).filter(b => b.trim());
    const parsedQuestions = blocks.map((block, i) => {
      const lines = block.split('\n').map(l => l.trim()).filter(l => l);
      
      let speaker1 = '';
      let template = '';
      let correctSentence: string[] = [];
      let words: string[] = [];

      lines.forEach(line => {
        if (line.match(/^(问句|Question)[：:]/i)) {
          speaker1 = line.replace(/^(问句|Question)[：:]\s*/i, '').trim();
        } else if (line.match(/^(空格[和与]待选词|句子|Sentence)[：:]/i)) {
          let cleanTemplate = line.replace(/^(空格[和与]待选词|句子|Sentence)[：:]\s*/i, '').trim();
          let blankCount = 0;
          template = cleanTemplate.replace(/_{2,}/g, () => `{${blankCount++}}`);
        } else if (line.match(/^(备选单词|备选词排序|Words)[：:]/i)) {
          const rawWords = line.replace(/^(备选单词|备选词排序|Words)[：:]\s*/i, '').split(/[/,;；]\s*/);
          const allWords = rawWords.map(w => w.trim()).filter(w => w);
          // Separate distractors (words in parentheses - handle both half and full width)
          correctSentence = allWords.filter(w => !((w.startsWith('(') && w.endsWith(')')) || (w.startsWith('（') && w.endsWith('）'))));
          const distractors = allWords
            .filter(w => (w.startsWith('(') && w.endsWith(')')) || (w.startsWith('（') && w.endsWith('）')))
            .map(w => w.slice(1, -1).trim());
          words = [...correctSentence, ...distractors].sort(() => Math.random() - 0.5);
        }
      });

      return {
        id: i + 1,
        isFree: true,
        conversation: {
          speaker1: { avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Speaker${i}`, text: speaker1 },
          speaker2: { avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Speaker${i+10}` }
        },
        template,
        correctSentence,
        words: words.length > 0 ? words : [...correctSentence].sort(() => Math.random() - 0.5)
      };
    });

    // Filter out empty results
    const validQuestions = parsedQuestions.filter(q => q.template && q.correctSentence.length > 0);

    if (validQuestions.length > 0) {
      setNewQuestions(validQuestions);
      setShowBulkInput(false);
      setBulkText('');
      alert(`Successfully parsed ${validQuestions.length} questions!`);
    } else {
      alert("Could not find any questions to parse. Please ensure each question follows the format:\n题目x:\n问句：...\n空格和待选词：... (use ___ for blanks)\n备选词排序：word1 / word2 / ...");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sets
        const questionsSnapshot = await getDocs(collection(db, 'questions'));
        setSets(questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Fetch results
        const resultsSnapshot = await getDocs(query(collection(db, 'results'), orderBy('completedAt', 'desc'), limit(500)));
        setResults(resultsSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          completedAt: doc.data().completedAt?.toDate?.()?.toISOString() || doc.data().completedAt,
          timeSpent: doc.data().timeSpent || doc.data().timeTaken || 0
        })) as QuizResult[]);

        // Fetch students
        const usersSnapshot = await getDocs(collection(db, 'users'));
        setStudents(usersSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          expiresAt: doc.data().expiresAt?.toDate?.()?.toISOString() || doc.data().expiresAt
        })));

        // Fetch codes
        const codesSnapshot = await getDocs(collection(db, 'activationCodes'));
        setActivationCodes(codesSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
        })) as ActivationCode[]);

      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 点击错题查看原题
  const handleViewQuestion = (key: string) => {
    const [setId, idxStr] = key.split('::');
    const idx = parseInt(idxStr);
    const set = sets.find(s => s.id === setId);
    if (set && set.questions && set.questions[idx]) {
      setSelectedQuestion({ set, question: set.questions[idx], idx });
    }
  };

  // 核心逻辑：错题排行 & 数据看板
  const stats = useMemo(() => {
    if (results.length === 0) return null;
    const totalAttempts = results.length;
    const avgScore = results.reduce((acc, r) => acc + (r.score / r.totalQuestions), 0) / totalAttempts * 100;
    const uniqueUsers = new Set(results.map(r => r.userId)).size;

    // 构建 setId -> [题目内容列表] 的映射，方便按索引查找
    const setQuestionsMap: Record<string, string[]> = {};
    sets.forEach(set => {
      const qs: any[] = set.questions || [];
      setQuestionsMap[set.id] = qs.map((q: any, idx: number) => {
        return q.conversation?.speaker1?.text || q.template || q.text || `题目 ${idx + 1}`;
      });
    });

    // key: "setId::questionIndex"
    const questionStats: Record<string, { correct: number, total: number, setId: string, setName: string, qIdx: number, content: string }> = {};
    results.forEach(r => {
      r.details.forEach((d: any, qIdx: number) => {
        // 用 questionId（如果存在且是数字）或 数组索引 构造 key
        const qId = d.questionId;
        const idx = (qId !== undefined && qId !== null && !isNaN(Number(qId))) ? Number(qId) : qIdx;
        const key = `${r.setId}::${idx}`;
        if (!questionStats[key]) {
          // 优先从缓存取内容，否则从 setQuestionsMap 找
          const content = setQuestionsMap[r.setId]?.[idx] || `题目 ${idx + 1}`;
          questionStats[key] = { correct: 0, total: 0, setId: r.setId, setName: r.setName, qIdx: idx, content };
        }
        questionStats[key].total++;
        if (d.isCorrect) questionStats[key].correct++;
      });
    });

    const questionErrorRank = Object.entries(questionStats)
      .map(([key, s]) => {
        const label = s.content.length > 40 ? s.content.slice(0, 40) + '…' : s.content;
        return {
          id: key,
          label,
          setName: s.setName,
          errorRate: Math.round(((s.total - s.correct) / s.total) * 100),
          total: s.total,
          correct: s.correct
        };
      })
      .sort((a, b) => b.errorRate - a.errorRate);

    return { totalAttempts, avgScore: Math.round(avgScore), uniqueUsers, questionErrorRank };
  }, [results, sets]);

  // 学生大数据汇总
  const studentStats = useMemo(() => {
    const stats: Record<string, { total: number, correct: number, totalQuestions: number, lastAttempt: string | null }> = {};
    results.forEach(r => {
      if (!stats[r.userId]) stats[r.userId] = { total: 0, correct: 0, totalQuestions: 0, lastAttempt: null };
      stats[r.userId].total++;
      stats[r.userId].correct += r.correctCount || 0;
      stats[r.userId].totalQuestions += r.totalQuestions || 0;
      if (!stats[r.userId].lastAttempt || new Date(r.completedAt) > new Date(stats[r.userId].lastAttempt!)) {
        stats[r.userId].lastAttempt = r.completedAt;
      }
    });
    return stats;
  }, [results]);

  // 生成 8位 随机激活码
  const generateCode = async () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    try {
      const newCode = { 
        code, 
        used: false, 
        type: 'pro',
        status: 'unused', // Keep for backward compatibility if needed
        createdAt: serverTimestamp() 
      };
      // 确保文档 ID (Document ID) 也设为这个 8 位随机码
      await setDoc(doc(db, 'activationCodes', code), newCode);
      
      // UI 实时更新
      setActivationCodes(prev => [{ id: code, ...newCode, createdAt: new Date().toISOString() } as any, ...prev]);
    } catch (e) { handleFirestoreError(e, OperationType.CREATE, 'activationCodes'); }
  };

  const handleSaveSet = async () => {
    if (!newSetName) {
      alert("Please enter a set name");
      return;
    }

    // Basic validation for questions
    const isValid = newQuestions.every(q => q.template && q.correctSentence && q.correctSentence.length > 0);
    if (!isValid) {
      alert("Please fill in all question templates and correct sentences");
      return;
    }

    try {
      const setData = {
        name: newSetName,
        isFree,
        questions: newQuestions,
        questionCount: newQuestions.length,
        updatedAt: Timestamp.now()
      };

      if (editingSetId) {
        await updateDoc(doc(db, 'questions', editingSetId), setData);
        setSets(prev => prev.map(s => s.id === editingSetId ? { ...s, ...setData, questionCount: newQuestions.length } : s));
      } else {
        const docRef = await addDoc(collection(db, 'questions'), {
          ...setData,
          createdAt: Timestamp.now(),
          order: sets.length
        });
        setSets(prev => [...prev, { id: docRef.id, ...setData, questionCount: newQuestions.length }]);
      }
      
      setNewSetName('');
      setEditingSetId(null);
      setNewQuestions(Array(10).fill(null).map((_, i) => ({
        id: i + 1,
        isFree: true,
        conversation: {
          speaker1: { avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Speaker${i}`, text: '' },
          speaker2: { avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Speaker${i+10}` }
        },
        template: '',
        correctSentence: [],
        words: []
      })));
      setActiveTab('overview');
      alert("Question set saved successfully!");
    } catch (error) {
      handleFirestoreError(error, editingSetId ? OperationType.UPDATE : OperationType.CREATE, editingSetId ? `questions/${editingSetId}` : 'questions');
    }
  };

  const updateQuestion = (index: number, field: keyof Question | 'speaker1Text', value: any) => {
    const updated = [...newQuestions];
    if (field === 'speaker1Text') {
      updated[index].conversation!.speaker1.text = value;
    } else if (field === 'correctSentence') {
      // Split by comma, slash or semicolon
      const allWords = value.split(/[,，/；;]\s*/).map((s: string) => s.trim()).filter((s: string) => s);
      const correct = allWords.filter((w: string) => !((w.startsWith('(') && w.endsWith(')')) || (w.startsWith('（') && w.endsWith('）'))));
      const distractors = allWords
        .filter((w: string) => (w.startsWith('(') && w.endsWith(')')) || (w.startsWith('（') && w.endsWith('）')))
        .map((w: string) => w.slice(1, -1).trim());
      
      updated[index].correctSentence = correct;
      updated[index].words = [...correct, ...distractors].sort(() => Math.random() - 0.5);
      
      // Auto-generate template if empty
      if (!updated[index].template) {
        updated[index].template = correct.map((_: any, i: number) => `{${i}}`).join(' ');
      }
    } else {
      (updated[index] as any)[field] = value;
    }
    setNewQuestions(updated);
  };

  const addQuestion = () => {
    setNewQuestions(prev => [...prev, {
      id: prev.length + 1,
      isFree: true,
      conversation: {
        speaker1: { avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Speaker${prev.length}`, text: '' },
        speaker2: { avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Speaker${prev.length+10}` }
      },
      template: '',
      correctSentence: [],
      words: []
    }]);
  };

  const deleteQuestion = (index: number) => {
    setNewQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditSet = async (id: string) => {
    try {
      const docSnap = await getDoc(doc(db, 'questions', id));
      if (!docSnap.exists()) throw new Error("Set not found");
      const data = docSnap.data();
      setEditingSetId(id);
      setNewSetName(data.name);
      setIsFree(data.isFree);
      setNewQuestions(data.questions);
      setActiveTab('sets');
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `questions/${id}`);
    }
  };

  const handleDeleteSet = async (id: string) => {
    if (!confirm("Are you sure you want to delete this set?")) return;
    try {
      await deleteDoc(doc(db, 'questions', id));
      setSets(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `questions/${id}`);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const index = sets.findIndex(s => s.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sets.length - 1) return;

    const newSets = [...sets];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSets[index], newSets[targetIndex]] = [newSets[targetIndex], newSets[index]];

    setSets(newSets);
    
    try {
      // Update order field for affected sets in Firestore
      const updatePromises = newSets.map((s, i) => 
        updateDoc(doc(db, 'questions', s.id), { order: i })
      );
      await Promise.all(updatePromises);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'questions/reorder');
    }
  };

  const extendSubscription = async (studentId: string, currentExpiresAt: string) => {
    try {
      const current = currentExpiresAt ? new Date(currentExpiresAt) : new Date();
      current.setDate(current.getDate() + 7);
      const newExpiresAt = current.toISOString();
      
      await updateDoc(doc(db, 'users', studentId), {
        expiresAt: newExpiresAt
      });
      
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, expiresAt: newExpiresAt } : s));
      alert("Subscription extended by 7 days!");
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${studentId}`);
    }
  };

  const deleteCode = async (id: string) => {
    if (!confirm("Are you sure you want to delete this code?")) return;
    try {
      await deleteDoc(doc(db, 'activationCodes', id));
      setActivationCodes(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `activationCodes/${id}`);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">加载中...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 bg-white text-gray-600 hover:text-teal-600 rounded-2xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
              title="返回练习首页"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Eva 管理后台</h1>
              <p className="text-gray-500 font-medium text-xs sm:text-sm hidden sm:block">写作团数据监控与激活码管理</p>
            </div>
          </div>
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-200 overflow-x-auto -mx-1 px-1">
            {['overview', 'sets', 'students', 'codes'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap flex-shrink-0",
                  activeTab === tab ? "bg-teal-600 text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"
                )}
              >
                {tab === 'overview' ? '数据总览' : tab === 'sets' ? '题库管理' : tab === 'students' ? '学生监控' : '激活码'}
              </button>
            ))}
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 第一行：统计数据 + 错题排行 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-teal-50 p-6 rounded-3xl">
                <p className="text-teal-600 text-xs font-bold uppercase mb-1">总练习次数</p>
                <p className="text-3xl font-black">{stats?.totalAttempts}</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-3xl">
                <p className="text-blue-600 text-xs font-bold uppercase mb-1">平均正确率</p>
                <p className="text-3xl font-black">{stats?.avgScore}%</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-3xl">
                <p className="text-purple-600 text-xs font-bold uppercase mb-1">活跃学生数</p>
                <p className="text-3xl font-black">{stats?.uniqueUsers}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-black mb-4 flex items-center gap-2">
                  <TrendingUp className="text-rose-500" /> 错题排行 TOP 3
                </h3>
                <div className="space-y-2">
                  {stats?.questionErrorRank.slice(0, 3).map((q, idx) => (
                    <div 
                      key={q.id} 
                      onClick={() => handleViewQuestion(q.id)}
                      className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 -mx-2 transition-colors"
                    >
                      <span className="w-5 h-5 flex-shrink-0 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-[10px] font-black">
                        {idx + 1}
                      </span>
                      <p className="flex-1 text-xs font-medium text-gray-600 truncate">{q.label}</p>
                      <span className="text-rose-600 font-black text-xs">{q.errorRate}%</span>
                    </div>
                  ))}
                  {(!stats?.questionErrorRank || stats.questionErrorRank.length === 0) && (
                    <p className="text-xs text-gray-400 text-center py-2">暂无数据</p>
                  )}
                </div>
              </div>
            </div>

            {/* 错题排行完整版 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <TrendingUp className="text-rose-500" /> 错题排行
              </h3>
              <div className="space-y-4">
                {stats?.questionErrorRank.slice(0, 10).map((q, idx) => (
                  <div 
                    key={q.id} 
                    onClick={() => handleViewQuestion(q.id)}
                    className="flex items-start justify-between p-4 bg-gray-50 rounded-2xl gap-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="w-6 h-6 flex-shrink-0 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-black mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-700 text-sm leading-snug">{q.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{q.setName} · {q.total} 次作答</p>
                      </div>
                    </div>
                    <span className="text-rose-600 font-black flex-shrink-0">{q.errorRate}% 错误率</span>
                  </div>
                ))}
                {(!stats?.questionErrorRank || stats.questionErrorRank.length === 0) && (
                  <p className="text-center text-gray-400 py-8">暂无错题数据</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sets' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Existing Sets List */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BookOpen className="text-teal-600" /> Existing Sets
              </h3>
              <div className="space-y-4">
                {sets.map((set, index) => (
                  <div key={set.id} className="p-4 rounded-xl border border-gray-100 hover:border-teal-200 transition-colors group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <button 
                            onClick={() => handleReorder(set.id, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                          >
                            <Plus size={12} className="rotate-180" />
                          </button>
                          <button 
                            onClick={() => handleReorder(set.id, 'down')}
                            disabled={index === sets.length - 1}
                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <h4 className="font-bold text-gray-900">{set.name}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                          set.isFree ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                        )}>
                          {set.isFree ? 'Free' : 'Pro'}
                        </span>
                        <button 
                          onClick={() => handleEditSet(set.id)}
                          className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Settings size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteSet(set.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create New Set Form */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  {editingSetId ? <Settings className="text-teal-600" /> : <Plus className="text-teal-600" />} 
                  {editingSetId ? 'Edit Question Set' : 'Create New Set'}
                </h3>
                <div className="flex items-center gap-3">
                  {editingSetId && (
                    <button 
                      onClick={() => {
                        setEditingSetId(null);
                        setNewSetName('');
                        setNewQuestions(Array(10).fill(null).map((_, i) => ({
                          id: i + 1,
                          isFree: true,
                          conversation: {
                            speaker1: { avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Speaker${i}`, text: '' },
                            speaker2: { avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Speaker${i+10}` }
                          },
                          template: '',
                          correctSentence: [],
                          words: []
                        })));
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button 
                    onClick={() => setShowBulkInput(!showBulkInput)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    <MessageSquare size={18} /> {showBulkInput ? 'Close Bulk Upload' : 'Bulk Upload Text'}
                  </button>
                  <button 
                    onClick={handleSaveSet}
                    className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg"
                  >
                    <Save size={18} /> Save Set
                  </button>
                </div>
              </div>

              {showBulkInput && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-8 p-6 bg-teal-50 rounded-2xl border border-teal-100"
                >
                  <label className="block text-sm font-bold text-teal-900 mb-2">Paste your questions here:</label>
                  <textarea 
                    value={bulkText}
                    onChange={e => setBulkText(e.target.value)}
                    className="w-full h-48 p-4 bg-white border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-mono text-sm mb-4"
                    placeholder={`题目 1\n问句： Who wrote the article you mentioned in class?\n空格和待选词： I'm not ___ ___ ___ ___ ___ .\n备选词排序： sure / who / the / author / is / (writer) / (what)`}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-teal-600 italic">格式：题目 X, 问句：..., 空格和待选词：..., 备选词排序：单词1 / 单词2 / (干扰项)</p>
                    <button 
                      onClick={handleBulkParse}
                      className="px-6 py-2 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all"
                    >
                      Parse & Apply
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Set Name</label>
                    <input 
                      type="text" 
                      value={newSetName}
                      onChange={e => setNewSetName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="e.g. TOEFL Practice Set 1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Access Type</label>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setIsFree(true)}
                        className={cn(
                          "flex-1 py-3 rounded-xl font-bold text-sm border transition-all",
                          isFree ? "bg-green-50 border-green-500 text-green-700" : "bg-white border-gray-200 text-gray-500"
                        )}
                      >
                        Free
                      </button>
                      <button 
                        onClick={() => setIsFree(false)}
                        className={cn(
                          "flex-1 py-3 rounded-xl font-bold text-sm border transition-all",
                          !isFree ? "bg-orange-50 border-orange-500 text-orange-700" : "bg-white border-gray-200 text-gray-500"
                        )}
                      >
                        Pro (Locked)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {newQuestions.map((q, idx) => (
                    <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </span>
                          <h4 className="font-bold text-gray-800">题目详情</h4>
                        </div>
                        <button 
                          onClick={() => deleteQuestion(idx)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                            <MessageSquare size={14} /> 问句
                          </label>
                          <input 
                            type="text" 
                            value={q.conversation?.speaker1.text}
                            onChange={e => updateQuestion(idx, 'speaker1Text', e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                            placeholder="Are you going to the student assembly?"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                            <CheckCircle2 size={14} /> 备选词排序 (请按正确顺序输入，用逗号隔开，干扰项请用括号括起来)
                          </label>
                          <input 
                            type="text" 
                            value={q.correctSentence?.join(', ')}
                            onChange={e => updateQuestion(idx, 'correctSentence', e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                            placeholder="sure, who, the, author, is, (writer), (what)"
                          />
                          <p className="text-[10px] text-gray-400 mt-1 italic">系统会自动为学生打乱单词顺序。括号内的单词将作为干扰项出现，不计入正确答案。</p>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-2">
                            <Settings size={14} /> 空格和待选词 (使用 {0}, {1} 代表空格)
                          </label>
                          <input 
                            type="text" 
                            value={q.template}
                            onChange={e => updateQuestion(idx, 'template', e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                            placeholder="{0} {1} {2} {3} {4} {5} {6} ."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={addQuestion}
                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-teal-500 hover:text-teal-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={20} /> Add Another Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h3 className="text-xl font-black">学生大数据看板</h3>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setStudentFilter('all')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                    studentFilter === 'all' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  全部学生
                </button>
                <button 
                  onClick={() => setStudentFilter('pro')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                    studentFilter === 'pro' ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  写作团 (Pro)
                </button>
                <button 
                  onClick={() => setStudentFilter('free')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                    studentFilter === 'free' ? "bg-white text-teal-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  免费版 (Guest)
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase font-bold border-b border-gray-50">
                    <th className="pb-4">学生手机号</th>
                    <th className="pb-4">有效期 (expiredAt)</th>
                    <th className="pb-4 text-center">总做题数</th>
                    <th className="pb-4 text-center">平均正确率</th>
                    <th className="pb-4">最近练习</th>
                    <th className="pb-4">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {students.filter(s => {
                    if (studentFilter === 'all') return s.role === 'student' || s.role === 'guest_student';
                    if (studentFilter === 'pro') return s.role === 'student';
                    if (studentFilter === 'free') return s.role === 'guest_student';
                    return false;
                  }).map(s => {
                    const stat = studentStats[s.id] || { total: 0, correct: 0, totalQuestions: 0, lastAttempt: null };
                    const isExpired = new Date() > new Date(s.expiresAt);
                    return (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-bold text-gray-900">
                          <div className="flex flex-col">
                            <span>{s.phone || s.username}</span>
                            <span className={cn(
                              "text-[10px] font-bold uppercase tracking-wider",
                              s.role === 'student' ? "text-orange-500" : "text-teal-500"
                            )}>
                              {s.role === 'student' ? '写作团 (Pro)' : '免费版 (Guest)'}
                            </span>
                          </div>
                        </td>
                        <td className={cn("py-4 font-bold", isExpired ? "text-rose-500" : "text-teal-600")}>
                          {new Date(s.expiresAt).toLocaleDateString()} {isExpired && '(已过期)'}
                        </td>
                        <td className="py-4 text-center font-bold text-gray-600">{stat.total}</td>
                        <td className="py-4 text-center font-black text-teal-600">
                          {stat.totalQuestions > 0 ? Math.round((stat.correct / stat.totalQuestions) * 100) : 0}%
                        </td>
                        <td className="py-4 text-sm text-gray-400">
                          {stat.lastAttempt ? new Date(stat.lastAttempt).toLocaleString() : '从未开始'}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => extendSubscription(s.id, s.expiresAt)}
                              className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-xs font-bold hover:bg-teal-100 transition-all flex items-center gap-1"
                            >
                              <Plus size={12} /> 延长 7 天
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm("确定要删除该学生吗？")) {
                                  deleteDoc(doc(db, 'users', s.id));
                                  setStudents(prev => prev.filter(st => st.id !== s.id));
                                }
                              }}
                              className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 最近练习记录 */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Clock className="text-teal-600" /> 最近练习记录
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase font-bold border-b border-gray-50">
                      <th className="pb-4">学生 / 游客</th>
                      <th className="pb-4">练习题目</th>
                      <th className="pb-4 text-center">正确率</th>
                      <th className="pb-4 text-center">用时</th>
                      <th className="pb-4">完成时间</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {results.slice(0, 20).map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900">{r.userName}</span>
                            <span className={cn(
                              "text-[10px] font-bold uppercase tracking-wider",
                              r.userId === 'guest' ? "text-gray-400" : "text-teal-500"
                            )}>
                              {r.userId === 'guest' ? '游客' : '正式学生'}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 font-medium text-gray-600">{r.setName}</td>
                        <td className="py-4 text-center">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-black",
                            r.score >= 80 ? "bg-green-50 text-green-600" : r.score >= 60 ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600"
                          )}>
                            {r.score}%
                          </span>
                        </td>
                        <td className="py-4 text-center font-medium text-gray-500">
                          {Math.floor(r.timeSpent / 60)}:{String(r.timeSpent % 60).padStart(2, '0')}
                        </td>
                        <td className="py-4 text-sm text-gray-400">
                          {r.completedAt ? new Date(r.completedAt).toLocaleString() : '未知'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'codes' && (
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black">激活码管理</h3>
              <button 
                onClick={generateCode}
                className="px-8 py-3 bg-teal-600 text-white rounded-2xl font-black hover:bg-teal-700 shadow-lg flex items-center gap-2"
              >
                <RefreshCw size={20} /> 生成 8位 随机激活码
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activationCodes.map(c => (
                <div key={c.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                  <div className="flex flex-col">
                    <code className="font-mono font-black text-teal-700">{c.code}</code>
                    {c.usedBy && <span className="text-[10px] text-gray-400">Used by: {c.usedBy.slice(0, 8)}...</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-lg uppercase", c.status === 'unused' ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500")}>
                      {c.status === 'unused' ? '未使用' : '已使用'}
                    </span>
                    <button 
                      onClick={() => deleteCode(c.id)}
                      className="p-1 text-gray-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 题目详情弹窗 */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedQuestion(null)}>
          <div 
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-900">题目详情</h3>
              <button 
                onClick={() => setSelectedQuestion(null)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* 题目标签 */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold">
                  {selectedQuestion.set.name}
                </span>
                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold">
                  第 {selectedQuestion.idx + 1} 题
                </span>
              </div>

              {/* 对话内容 */}
              {selectedQuestion.question.conversation?.speaker1?.text && (
                <div className="bg-blue-50 p-6 rounded-2xl">
                  <p className="text-xs font-bold text-blue-600 uppercase mb-2">听力对话</p>
                  <p className="text-gray-800 leading-relaxed">
                    {selectedQuestion.question.conversation.speaker1.text}
                  </p>
                </div>
              )}

              {/* 模板句子 */}
              {selectedQuestion.question.template && (
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <p className="text-xs font-bold text-gray-600 uppercase mb-2">填空模板</p>
                  <p className="text-gray-800 leading-relaxed font-medium">
                    {selectedQuestion.question.template.replace(/\{(\d+)\}/g, '____')}
                  </p>
                </div>
              )}

              {/* 正确答案 */}
              {selectedQuestion.question.correctSentence && selectedQuestion.question.correctSentence.length > 0 && (
                <div className="bg-green-50 p-6 rounded-2xl">
                  <p className="text-xs font-bold text-green-600 uppercase mb-2">正确答案</p>
                  <p className="text-green-800 font-black text-lg">
                    {selectedQuestion.question.correctSentence.join(' ')}
                  </p>
                </div>
              )}

              {/* 干扰词 */}
              {selectedQuestion.question.words && selectedQuestion.question.words.length > 0 && (
                <div className="bg-orange-50 p-6 rounded-2xl">
                  <p className="text-xs font-bold text-orange-600 uppercase mb-2">备选词（含干扰项）</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuestion.question.words.map((word: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
