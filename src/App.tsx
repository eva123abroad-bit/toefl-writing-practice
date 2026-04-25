/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useEffect, useCallback, useMemo, Component } from 'react';
import { 
  DndContext, 
  pointerWithin,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable,
  useDraggable,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  LayoutDashboard, 
  LogIn, 
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Lock,
  CreditCard,
  BookOpen,
  ArrowRight,
  Trophy,
  Check,
  X,
  AlertCircle,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  getDocs,
  setDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  query,
  where,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType, isFirebaseReady } from './firebase';
import { Question, QuestionSet, User as UserType } from './types';
import { cn } from './components/lib/utils';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import ErrorFeedback from './components/ErrorFeedback';
import TargetedPractice from './components/TargetedPractice';
import { analyzeQuizResults, OverallAnalysis } from './utils/errorAnalysis';
import { assessmentSet } from './data/seedQuestions';
import { generatePersonalizedSet, generateDiagnosticSet } from './utils/personalizedSet';

// --- Error Handling ---

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong.";
      try {
        const parsed = JSON.parse(this.state.error.message);
        if (parsed.error) errorMessage = parsed.error;
      } catch (e) {
        errorMessage = this.state.error.message || errorMessage;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-red-100">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <XCircle size={40} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Error</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-teal-600 transition-all shadow-lg"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Main() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

// --- Components ---

const DraggableWord = ({ id, word, isUsed }: { id: string, word: string, isUsed: boolean }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({ 
    id,
    disabled: isUsed 
  });

  if (isUsed) return null;

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 100 : 1,
    touchAction: 'none'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "px-4 py-2 bg-white rounded-xl shadow-sm border-2 border-gray-100 cursor-grab active:cursor-grabbing transition-all select-none font-medium text-sm",
        isDragging && "shadow-xl scale-105 border-teal-500 ring-4 ring-teal-500/10"
      )}
    >
      {word}
    </div>
  );
};

const DraggableInSlot = ({ id, word, index }: { id: string, word: string, index: number }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({ id: `in-slot-${index}-${word}` });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 100 : 1,
    touchAction: 'none'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "px-4 py-2 bg-teal-50 text-teal-700 rounded-lg font-medium cursor-grab active:cursor-grabbing shadow-sm border border-teal-200 text-sm",
        isDragging && "shadow-lg scale-110 opacity-80"
      )}
    >
      {word}
    </div>
  );
};

const DroppableZone = ({ 
  id, 
  word, 
  index
}: { 
  id: string, 
  word: string | null, 
  index: number
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-w-[100px] h-12 border-b-2 flex items-center justify-center transition-all px-2 font-medium",
        !word ? "border-gray-300 bg-gray-50/30" : "border-teal-600 bg-teal-50/50",
        isOver && "border-teal-400 bg-teal-100/50 scale-105 shadow-sm"
      )}
    >
      {word ? <DraggableInSlot id={word} word={word} index={index} /> : null}
    </div>
  );
};

// --- Main App ---

type View = 'landing' | 'login' | 'home' | 'quiz' | 'admin' | 'student-dashboard' | 'targeted-practice';

function App() {
  const [view, setView] = useState<View>('landing');
  const [intendedMode, setIntendedMode] = useState<'free' | 'pro' | null>(null);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestContact, setGuestContact] = useState('');
  const [user, setUser] = useState<UserType | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [pendingSet, setPendingSet] = useState<QuestionSet | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'free' | 'pro'>('all');
  
  // Auth State
  const [isRegistering, setIsRegistering] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Quiz State
  const [currentSet, setCurrentSet] = useState<QuestionSet | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedWords, setPlacedWords] = useState<(string | null)[]>([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(420);
  const [timerActive, setTimerActive] = useState(false);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [isOverTime, setIsOverTime] = useState(false);
  const [results, setResults] = useState<{ questionId?: number, isCorrect: boolean, userAnswer: string[], correctAnswer: string[] }[]>([]);
  // 存储每道题的用户答案（用于返回上一题）
  const [answerHistory, setAnswerHistory] = useState<(string | null)[][]>([]);
  // === Trace 行为追踪 ===
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [questionModifications, setQuestionModifications] = useState<Record<number, number>>({});
  const [questionFirstAnswerTime, setQuestionFirstAnswerTime] = useState<Record<number, string>>({});
  // 存储每题用时（用于返回上一题时不丢失已计时数据）
  const [questionTimeSpent, setQuestionTimeSpent] = useState<Record<number, number>>({});
  // 打乱当前题目的备选词（每次切换题目时重新打乱）
  const shuffledWords = useMemo(() => {
    const words = questions[currentIndex]?.words || [];
    const arr = [...words];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [currentIndex, questions]);

  // 错因分析
  const [errorAnalysis, setErrorAnalysis] = useState<OverallAnalysis | null>(null);
  // 正确题目的ID集合（用于提升练习排除）
  const [correctQuestionIds, setCorrectQuestionIds] = useState<Set<number>>(new Set());
  // 诊断测试的错因分析（用于个性化练习后的进步对比）
  const [diagnosticAnalysis, setDiagnosticAnalysis] = useState<OverallAnalysis | null>(null);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && !isFinished) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) setIsOverTime(true); // 刚好到0时标记超时
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isFinished]);

  const isQuestionLocked = (question: Question) => {
    if (question?.isFree) return false;
    if (user?.role === 'admin') return false;
    
    // Pro questions require 'student' role and valid subscription
    if (user?.role !== 'student') return true;
    
    const isExpired = new Date() > new Date(user.expiresAt);
    if (isExpired || !isSubscribed) return true;
    
    return false;
  };

  const formatTime = (seconds: number) => {
    const abs = Math.abs(seconds);
    const mins = Math.floor(abs / 60);
    const secs = abs % 60;
    const prefix = seconds < 0 ? '-' : '';
    return `${prefix}${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Auth Effect
  useEffect(() => {
    // Firebase 未配置时跳过认证
    if (!isFirebaseReady || !auth || !db) {
      console.log('[Auth] Firebase 未配置，跳过认证');
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthLoading(true);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserType;
            setUser({ ...userData, id: firebaseUser.uid });
          } else {
            setUser(null);
          }
        } catch (e) {
          console.error("Error fetching user doc:", e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Home State
  const [availableSets, setAvailableSets] = useState<QuestionSet[]>([]);
  const [loadingSets, setLoadingSets] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchSets();
  }, []);

  useEffect(() => {
    if (user) {
      checkSubscription();
      if (pendingSet) {
        startSet(pendingSet);
        setPendingSet(null);
      }
    }
  }, [user]);

  const fetchSets = async () => {
    setLoadingSets(true);
    // Firebase 未配置时直接使用诊断题组
    if (!isFirebaseReady || !db) {
      console.log('[Seed] Firebase 未配置，使用本地诊断题组');
      setAvailableSets([assessmentSet]);
      setLoadingSets(false);
      return;
    }
    try {
      const questionsSnapshot = await getDocs(collection(db, 'questions'));
      const data = questionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as QuestionSet[];
// 如果 Firestore 为空，使用本地诊断题组
        if (data.length === 0) {
          console.log('[Seed] Firestore 无数据，使用本地诊断题组');
          setAvailableSets([assessmentSet]);
        } else {
          setAvailableSets([assessmentSet, ...data]);
        }
    } catch (error) {
console.warn('[Seed] Firestore 读取失败，使用本地诊断题组', error);
        setAvailableSets([assessmentSet]);
    } finally {
      setLoadingSets(false);
    }
  };

  const checkSubscription = () => {
    if (!user) {
      setIsSubscribed(false);
      return;
    }
    if (user.role === 'admin') {
      setIsSubscribed(true);
      return;
    }
    if (!user.expiresAt) {
      setIsSubscribed(false);
      return;
    }
    const isExpired = new Date() > new Date(user.expiresAt);
    setIsSubscribed(!isExpired);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Firebase 未配置时提示
    if (!isFirebaseReady || !auth) {
      alert('Firebase 未配置，无法登录。请配置 .env 文件或直接使用本地种子数据练习。');
      setView('home');
      return;
    }
    console.log('开始登录请求...', phone);
    setLoginError('');
    setLoading(true);
    try {
      const email = phone.includes('@') ? phone : `${phone}@toefl.com`;
      await signInWithEmailAndPassword(auth, email, password);
      console.log('登录成功');
      setView('home');
    } catch (error: any) {
      console.error('Login error:', error);
      alert('登录失败原因：' + error.message);
      setLoginError(error.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Firebase 未配置时提示
    if (!isFirebaseReady || !auth || !db) {
      alert('Firebase 未配置，无法注册。请配置 .env 文件或直接使用本地种子数据练习。');
      setView('home');
      return;
    }
    console.log('开始注册请求...', phone, activationCode, intendedMode);
    setLoginError('');
    setLoading(true);

    try {
      let role: 'student' | 'guest_student' = 'guest_student';
      let expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // Guest students get 7 days free

      // 1. 验证激活码 (只有在 Pro 模式或填写了激活码时才验证)
      if (intendedMode === 'pro' || activationCode.trim() !== '') {
        if (activationCode.trim() === '') {
          throw new Error('加入写作团需要填写有效的激活码');
        }
        
        console.log('正在查询激活码：', activationCode);
        const q = query(collection(db, 'activationCodes'), where('code', '==', activationCode));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          console.log('数据库中未找到该码');
          throw new Error('无效的激活码，请检查输入是否正确');
        }
        
        const codeDoc = querySnapshot.docs[0];
        const codeData = codeDoc.data();
        if (codeData.used === true || codeData.status === 'used') {
          throw new Error('该激活码已被使用，请联系Eva老师获取新码');
        }

        // 更新激活码状态
        await updateDoc(doc(db, 'activationCodes', codeDoc.id), {
          status: 'used',
          used: true,
          usedBy: 'pending', // Will update with UID after creation
          usedAt: new Date().toISOString()
        });
        
        role = 'student';
        expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 21); // Pro students get 21 days
      }

      // 2. 创建账号
      const email = `${phone}@toefl.com`;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      console.log('账号创建成功:', uid);

      // 如果使用了激活码，更新 usedBy
      if (role === 'student' && activationCode.trim() !== '') {
        const q = query(collection(db, 'activationCodes'), where('code', '==', activationCode));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          await updateDoc(doc(db, 'activationCodes', querySnapshot.docs[0].id), {
            usedBy: uid
          });
        }
      }

      // 4. 创建用户文档
      const newUser: UserType = {
        id: uid,
        name: phone,
        username: phone,
        email: email,
        phone: phone,
        role: role,
        expiresAt: expiresAt.toISOString()
      };

      await setDoc(doc(db, 'users', uid), newUser);
      console.log('用户文档创建成功');
      
      alert(role === 'student' ? '注册成功！欢迎加入写作团。' : '注册成功！已开启免费练习模式。');
      setFilterType(intendedMode === 'pro' ? 'pro' : 'free');
      setView('home');
      // 强制刷新确保 Firebase Auth 状态完全同步
      window.location.reload();
    } catch (error: any) {
      console.error('Registration error:', error);
      alert('注册失败原因：' + error.message);
      setLoginError(error.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isFirebaseReady && auth) {
      await signOut(auth);
    }
    setUser(null);
    setView('landing');
  };

  const startSet = async (set: QuestionSet) => {
    if (!set) return;
    
    // 诊断测试必须登录
    if (set?.id === 'assessment-diagnostic' && !user) {
      setIntendedMode('free');
      setView('login');
      return;
    }
    
    if (set?.isFree === false && !user) {
      setPendingSet(set);
      setView('login');
      return;
    }

    try {
      let setData = set;
      if (!set.questions) {
        const setDoc = await getDoc(doc(db, 'questions', set.id));
        if (setDoc.exists()) {
          setData = { id: setDoc.id, ...setDoc.data() } as QuestionSet;
        } else {
          throw new Error("Set not found");
        }
      }
      
      if (setData?.isFree === false) {
        if (!user) {
          setIntendedMode('pro');
          setPendingSet(setData);
          setView('login');
          return;
        }
        const isExpired = user.role === 'student' && new Date() > new Date(user.expiresAt);
        if (isExpired) {
          alert("账号已过期，请续费");
          return;
        }
        if (!isSubscribed && user?.role !== 'admin') {
          alert("This is a premium set. Please upgrade to access.");
          return;
        }
      }

      setCurrentSet(setData);
      setQuestions(setData.questions || []);
      setCurrentIndex(0);
      setScore(0);
      setIsFinished(false);
      setResults([]);
      setAnswerHistory([]); // 清空历史答案，防止上一题组答案残留
      setIsOverTime(false);
      setTimeLeft(setData.timeLimit || 420);
      setTimerActive(true);
      // 重置 Trace 追踪状态
      setQuestionStartTime(Date.now());
      setQuestionModifications({});
      setQuestionFirstAnswerTime({});
      setQuestionTimeSpent({});
      if (setData.questions && setData.questions.length > 0) {
        initQuestion(setData.questions[0]);
      }
      setView('quiz');
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `questions/${set.id}`);
    }
  };

  const initQuestion = (q: Question) => {
    setPlacedWords(new Array(q.correctSentence.length).fill(null));
  };

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    const activeId = active.id as string;
    let word = activeId;
    let fromIndex = -1;

    if (activeId.startsWith('in-slot-')) {
      const parts = activeId.replace('in-slot-', '').split('-');
      fromIndex = parseInt(parts[0]);
      word = parts.slice(1).join('-');
    }

    // Trace: 记录修改次数（每次拖拽到有效位置时 +1）
    if (over) {
      setQuestionModifications(prev => ({
        ...prev,
        [currentIndex]: (prev[currentIndex] || 0) + 1
      }));
      // Trace: 记录首次作答时间
      if (!questionFirstAnswerTime[currentIndex]) {
        setQuestionFirstAnswerTime(prev => ({
          ...prev,
          [currentIndex]: new Date().toISOString()
        }));
      }
    }

    const newPlaced = [...placedWords];

    if (!over) {
      if (fromIndex !== -1) {
        newPlaced[fromIndex] = null;
        setPlacedWords(newPlaced);
      }
      return;
    }

    const overId = over.id as string;
    let toIndex = -1;

    if (overId.startsWith('drop-')) {
      toIndex = parseInt(overId.split('-')[1]);
    } else if (overId.startsWith('in-slot-')) {
      toIndex = parseInt(overId.replace('in-slot-', '').split('-')[0]);
    }

    if (toIndex !== -1) {
      if (fromIndex !== -1) {
        newPlaced[fromIndex] = null;
      } else {
        const existingIndex = newPlaced.indexOf(word);
        if (existingIndex !== -1) newPlaced[existingIndex] = null;
      }
      newPlaced[toIndex] = word;
      setPlacedWords(newPlaced);
    } else {
      if (fromIndex !== -1) {
        newPlaced[fromIndex] = null;
        setPlacedWords(newPlaced);
      }
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    setTimerActive(false);
    const duration = 360 - timeLeft;
    setTimeTaken(duration);
    
    // 运行错因分析
    const allResults = [...results, {
      isCorrect: JSON.stringify(placedWords) === JSON.stringify(questions[currentIndex].correctSentence),
      userAnswer: placedWords.map(w => w || ""),
      correctAnswer: questions[currentIndex].correctSentence || []
    }];
    const analysis = analyzeQuizResults(allResults, questions);
    setErrorAnalysis(analysis);
    // 收集正确题目ID
    const correctIds = new Set<number>();
    allResults.forEach((r, i) => { if (r.isCorrect && questions[i]) correctIds.add(questions[i].id); });
    setCorrectQuestionIds(correctIds);
    
    // 先保存结果（游客不填写也保存匿名记录）
    saveResult(duration);
    
    // 如果是游客，弹出弹窗让用户可选填写微信
    if (!user) {
      setShowGuestModal(true);
    }
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowGuestModal(false);
    saveResult(timeTaken);
  };

  const nextQuestion = () => {
    const currentQ = questions[currentIndex];
    const isCorrect = JSON.stringify(placedWords) === JSON.stringify(currentQ.correctSentence);

    // Trace: 记录当前题用时（秒）
    const timeSpentOnCurrent = Math.floor((Date.now() - questionStartTime) / 1000);
    setQuestionTimeSpent(prev => ({
      ...prev,
      [currentIndex]: (prev[currentIndex] || 0) + timeSpentOnCurrent
    }));

    const newHistory = [...answerHistory];
    newHistory[currentIndex] = [...placedWords];
    setAnswerHistory(newHistory);

    const newResults = [...results];
    newResults[currentIndex] = {
      questionId: currentQ.id,
      isCorrect,
      userAnswer: placedWords.map(w => w || ""),
      correctAnswer: currentQ.correctSentence || []
    };
    setResults(newResults);
    setScore(newResults.filter(r => r.isCorrect).length);

    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      // Trace: 重置下一题计时起点
      setQuestionStartTime(Date.now());
      if (newHistory[nextIdx]) {
        setPlacedWords([...newHistory[nextIdx]]);
      } else {
        initQuestion(questions[nextIdx]);
      }
    } else {
      finishQuiz();
    }
  };
  
  const prevQuestion = () => {
    if (currentIndex === 0) return;

    // Trace: 记录当前题用时（返回上一题时暂停计时）
    const timeSpentOnCurrent = Math.floor((Date.now() - questionStartTime) / 1000);
    setQuestionTimeSpent(prev => ({
      ...prev,
      [currentIndex]: (prev[currentIndex] || 0) + timeSpentOnCurrent
    }));

    const newHistory = [...answerHistory];
    newHistory[currentIndex] = [...placedWords];
    setAnswerHistory(newHistory);

    const prevIdx = currentIndex - 1;
    setCurrentIndex(prevIdx);
    // Trace: 重置计时起点（返回时从 0 重新开始计上一题的追加时间）
    setQuestionStartTime(Date.now());

    if (newHistory[prevIdx]) {
      setPlacedWords([...newHistory[prevIdx]]);
    } else {
      initQuestion(questions[prevIdx]);
    }

    const trimmedResults = newHistory
      .slice(0, prevIdx)
      .map((savedAnswer, i) => {
        const q = questions[i];
        const isCorrect = JSON.stringify(savedAnswer) === JSON.stringify(q.correctSentence);
        return {
          questionId: q.id,
          isCorrect,
          userAnswer: savedAnswer.map(w => w || ""),
          correctAnswer: q.correctSentence || []
        };
      });
    setResults(trimmedResults);
    setScore(trimmedResults.filter(r => r.isCorrect).length);
  };

  const saveResult = async (duration: number) => {
    if (!currentSet) return;
    // Firebase 未配置时跳过保存
    if (!isFirebaseReady || !db) {
      console.log('[Result] Firebase 未配置，跳过结果保存');
      return;
    }
    try {
      const finalScore = Math.round(((score + (JSON.stringify(placedWords) === JSON.stringify(questions[currentIndex].correctSentence) ? 1 : 0)) / questions.length) * 100);
      const finalCorrectCount = score + (JSON.stringify(placedWords) === JSON.stringify(questions[currentIndex].correctSentence) ? 1 : 0);
      
      // 将错因分析合并到 details
      const finalDetails = [...results, {
        questionId: questions[currentIndex]?.id ?? currentIndex,
        isCorrect: JSON.stringify(placedWords) === JSON.stringify(questions[currentIndex].correctSentence),
        userAnswer: placedWords.map(w => w || ""),
        correctAnswer: questions[currentIndex].correctSentence
      }].map((d, i) => ({
        ...d,
        analysis: errorAnalysis?.errors?.[i]?.analysis,
        ruleHint: errorAnalysis?.errors?.[i]?.ruleHint,
        hint: errorAnalysis?.errors?.[i]?.hint,
        // === 诊断结果持久化 ===
        diagnosis: errorAnalysis?.errors?.[i] && !errorAnalysis?.errors?.[i]?.isCorrect ? {
          category: errorAnalysis.errors[i].category,
          errorType: errorAnalysis.errors[i].errorType,
          keyPoints: errorAnalysis.errors[i].keyPoints,
          difficulty: errorAnalysis.errors[i].difficulty,
        } : null,
        // === Trace 行为追踪数据 ===
        timeSpent: questionTimeSpent[i] || 0,
        modifications: questionModifications[i] || 0,
        firstAnswerTime: questionFirstAnswerTime[i] || null,
        submitTime: i === questions.length - 1 ? new Date().toISOString() : null
      }));

      const resultData = {
        userId: user ? user.id : 'guest',
        userName: user ? (user.name || user.phone || user.username || 'Anonymous') : (guestContact || '匿名游客'),
        userEmail: user ? (user.email || '') : '',
        setId: currentSet.id,
        setName: currentSet.name || 'Unknown Set',
        score: finalScore,
        correctCount: finalCorrectCount,
        totalQuestions: questions.length,
        timeSpent: duration,
        timestamp: Timestamp.now(),
        completedAt: Timestamp.now(),
        details: finalDetails
      };
      await addDoc(collection(db, 'results'), resultData);
    } catch (error) {
      console.error("Error saving results:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (view === 'admin' && user?.role === 'admin') {
    return <AdminDashboard onBack={() => setView('home')} />;
  }

  if (view === 'student-dashboard' && user) {
    return <StudentDashboard userId={user.id} onBack={() => setView('home')} onSelectSet={(id) => {
      const set = availableSets.find(s => s.id === id);
      if (set) startSet(set);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Eva<span className="text-teal-600">托福学习团</span></span>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <button onClick={() => setView('admin')} className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-teal-600 font-bold transition-colors">
                    <ShieldCheck size={20} /> Admin
                  </button>
                )}
                <button onClick={() => setView('student-dashboard')} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-teal-600 font-bold transition-colors">
                  <LayoutDashboard size={20} /> My Progress
                </button>
                <div className="h-8 w-px bg-gray-100 hidden md:block"></div>
                <div className="flex items-center gap-3">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                    <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">
                      {user.role === 'admin' ? 'Administrator' : isSubscribed ? 'Pro Member' : 'Free Student'}
                    </p>
                  </div>
                  <button onClick={handleLogout} className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <button onClick={() => setView('login')} className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20">
                <LogIn size={18} /> Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div key="landing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-black text-gray-900 tracking-tight">Master TOEFL with <span className="text-teal-600">Confidence</span></h1>
                <p className="text-gray-500 text-xl max-w-2xl mx-auto">Interactive sentence building practice designed to help you ace the TOEFL exam.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div whileHover={{ y: -10 }} onClick={() => startSet(generateDiagnosticSet())} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-teal-600/5 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Sparkles size={32} /></div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">能力诊断测试</h3>
                  <p className="text-gray-500 mb-6">20道精选题，全面检测英语造句能力，获取个性化学习建议。</p>
                  <div className="flex items-center gap-2 font-bold text-teal-600">立即开始 <ArrowRight size={18} /></div>
                </motion.div>
                <motion.div whileHover={{ y: -10 }} onClick={() => { 
                  if (!user) {
                    setIntendedMode('pro');
                    setView('login');
                  } else { 
                    setFilterType('pro'); 
                    setView('home'); 
                  } 
                }} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-teal-600/5 transition-all cursor-pointer group relative">
                  <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Trophy size={32} /></div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">写作团</h3>
                  <p className="text-gray-500 mb-6">深度进阶练习，系统化提升。需登录并拥有Pro权限。</p>
                  <div className="flex items-center gap-2 font-bold text-orange-600">{user ? '进入写作团' : '登录解锁'} <ArrowRight size={18} /></div>
                  {!user && <div className="absolute top-6 right-6 text-orange-400"><Lock size={20} /></div>}
                </motion.div>
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-200 opacity-60 cursor-not-allowed relative overflow-hidden">
                  <div className="w-16 h-16 bg-gray-200 text-gray-500 rounded-2xl flex items-center justify-center mb-6"><BookOpen size={32} /></div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">专项题库</h3>
                  <p className="text-gray-500 mb-6">针对性攻克薄弱环节，多维度专项训练。</p>
                  <div className="inline-block px-4 py-1.5 bg-gray-200 text-gray-600 rounded-full text-xs font-bold uppercase tracking-widest">Coming Soon</div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'login' && (
            <motion.div key="login" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-md mx-auto">
              <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100">
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <LogIn size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">{isRegistering ? '创建账号' : '欢迎回来'}</h2>
                  <p className="text-gray-500 font-medium">
                    {isRegistering 
                      ? (intendedMode === 'free' ? '为了保存练习进度并获取点评，请先注册（免费版无需激活码）' : '输入手机号和激活码开始学习') 
                      : '请输入您的登录凭据'}
                  </p>
                </div>

                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">手机号</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                      placeholder="请输入手机号"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">密码</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                      placeholder="请输入密码"
                      required
                    />
                  </div>

                  {isRegistering && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between ml-1">
                        <label className="text-sm font-bold text-gray-700">激活码</label>
                        {intendedMode === 'free' && (
                          <span className="text-[10px] bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-bold">免费版可不填</span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={activationCode}
                        onChange={(e) => setActivationCode(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                        placeholder={intendedMode === 'free' ? "如有激活码请填写，否则留空" : "请输入21天写作团激活码"}
                        required={intendedMode === 'pro'}
                      />
                    </div>
                  )}

                  {loginError && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold">
                      <AlertCircle size={18} />
                      {loginError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-teal-600 text-white rounded-2xl font-black text-lg hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      isRegistering ? '立即注册' : '登录'
                    )}
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
                    <p className="text-amber-800 text-sm font-medium">
                      还没有账号？联系 Eva 老师（微信 <span className="font-black">eve-180</span>）获取权限
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{isRegistering ? '已经有账号了？' : '还没有账号？'}</p>
                  <button
                    onClick={() => {
                      setIsRegistering(!isRegistering);
                      setLoginError('');
                    }}
                    className="w-full py-3 border-2 border-teal-600 text-teal-600 rounded-2xl font-bold hover:bg-teal-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isRegistering ? <LogIn size={18} /> : <Sparkles size={18} />}
                    {isRegistering ? '立即登录已有账号' : '新学生？使用激活码注册'}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setView('landing')}
                className="mt-8 w-full py-4 text-gray-500 font-bold hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} /> 返回首页
              </button>
            </motion.div>
          )}

          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setView('landing')} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={24} /></button>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{filterType === 'free' ? '能力诊断测试' : '写作团'}</h2>
                  <p className="text-gray-500 font-medium">Select a practice set to begin</p>
                </div>
              </div>
              {loadingSets ? (
                <div className="p-20 text-center font-bold text-teal-600 text-xl">正在加载题库，请稍候...</div>
              ) : (
                <>
                  {/* 诊断测试特殊卡片 - 显示在最前面 */}
                  {availableSets.some(s => s?.id === 'assessment-diagnostic') && filterType === 'free' && (
                    <motion.div
                      whileHover={{ y: -8 }}
                      onClick={() => startSet(generateDiagnosticSet())}
                      className="mb-8 bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl hover:shadow-teal-600/20 transition-all cursor-pointer text-white overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                            <GraduationCap size={28} />
                          </div>
                          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">推荐首测</span>
                        </div>
                        <h3 className="text-2xl font-black mb-2">能力诊断测试</h3>
                        <p className="text-teal-100 mb-6 leading-relaxed">20道精选题目，全面检测你的英语造句能力。完成后获得个性化学习建议和针对性练习推荐。</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-teal-100">约 14 分钟</span>
                          <div className="flex items-center gap-2 font-bold text-white">
                            开始诊断 <ArrowRight size={18} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 普通题库列表 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {availableSets
                      .filter(set => {
                        if (!set) return false;
                        // 诊断测试已在上方单独展示，这里不重复显示
                        if (set.id === 'assessment-diagnostic') return false;
                        return filterType === 'all' || (filterType === 'free' ? set.isFree : !set.isFree);
                      })
                      .map((set) => {
                        if (!set) return null;
                        const isExpired = user?.role === 'student' && new Date() > new Date(user.expiresAt);
                        const isLocked = !set.isFree && (isExpired || !isSubscribed) && user?.role !== 'admin';
                        return (
                          <motion.div key={set.id} whileHover={{ y: -8 }} className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-teal-600/5 transition-all cursor-pointer overflow-hidden" onClick={() => startSet(set)}>
                            <div className="relative z-10">
                              <div className="flex justify-between items-start mb-6">
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", set.isFree ? "bg-teal-50 text-teal-600" : "bg-orange-50 text-orange-600")}>
                                  {set.isFree ? <BookOpen size={28} /> : <Sparkles size={28} />}
                                </div>
                                {isLocked && <div className="bg-orange-100 text-orange-600 p-2 rounded-xl"><Lock size={18} /></div>}
                              </div>
                              <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{set.name}</h3>
                              <p className="text-gray-400 text-sm font-medium mb-8">{set.questionCount} Questions • {set.isFree ? 'Free Access' : 'Pro Content'}</p>
                              <div className="flex items-center justify-between">
                                <span className={cn("text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider", set.isFree ? "bg-teal-50 text-teal-700" : "bg-orange-50 text-orange-700")}>{set.isFree ? 'Free' : 'Pro'}</span>
                                <div className="flex items-center gap-2 font-bold text-teal-600 group-hover:translate-x-1 transition-transform">{isLocked ? (isExpired ? 'Account Expired' : 'Unlock Now') : 'Start Practice'} <ArrowRight size={18} /></div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {view === 'quiz' && currentSet && (
            <motion.div key="quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
              {!isFinished ? (
                <div className="space-y-8 relative">
                  <div className={cn("space-y-8 transition-all duration-500", isQuestionLocked(questions[currentIndex]) && "blur-2xl pointer-events-none select-none opacity-50")}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <button onClick={() => setView('home')} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={24} /></button>
                        <div>
                          <h2 className="text-2xl font-black text-gray-900">{currentSet.name}</h2>
                          <p className="text-gray-400 font-medium">Question {currentIndex + 1} of {questions.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={prevQuestion} 
                          disabled={currentIndex === 0}
                          className={cn(
                            "px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2",
                            currentIndex === 0 
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          )}
                        >
                          <ArrowLeft size={18} /> Prev
                        </button>
                        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                          <Timer size={18} className={isOverTime ? "text-red-500" : "text-teal-600"} />
                          {isOverTime ? (
                            <span className="font-mono font-bold text-red-500 animate-pulse">
                              超时 {formatTime(-timeLeft)}
                            </span>
                          ) : (
                            <span className={cn("font-mono font-bold", timeLeft < 30 ? "text-red-600 animate-pulse" : "text-gray-700")}>{formatTime(timeLeft)}</span>
                          )}
                        </div>
                        <button onClick={nextQuestion} className="px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 bg-teal-600 text-white hover:bg-teal-700 shadow-md">{currentIndex < questions.length - 1 ? "Next" : "Finish"}<ChevronRight size={18} /></button>
                      </div>
                    </div>
                    <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="space-y-12 relative z-10">
                          <div className="flex items-start gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-teal-50 flex-shrink-0 overflow-hidden border-2 border-white shadow-md"><img src={questions[currentIndex].conversation.speaker1.avatar} alt="Speaker 1" className="w-full h-full object-cover" /></div>
                            <div className="bg-teal-50 p-6 rounded-3xl rounded-tl-none relative shadow-sm"><p className="text-lg font-medium text-teal-900 leading-relaxed">{questions[currentIndex].conversation.speaker1.text}</p><div className="absolute top-0 -left-2 w-4 h-4 bg-teal-50 transform rotate-45"></div></div>
                          </div>
                          <div className="flex items-start gap-6 flex-row-reverse">
                            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex-shrink-0 overflow-hidden border-2 border-white shadow-md"><img src={questions[currentIndex].conversation.speaker2.avatar} alt="Speaker 2" className="w-full h-full object-cover" /></div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-3 p-8 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 min-h-[100px] items-center justify-center">
                                {questions[currentIndex].template.split(/(\{\d+\})/g).filter(p => p !== '').map((part, idx) => {
                                  const match = part.match(/^\{(\d+)\}$/);
                                  if (match) {
                                    const placeholderIndex = parseInt(match[1]);
                                    const word = placedWords[placeholderIndex];
                                    return <DroppableZone key={`drop-${placeholderIndex}`} id={`drop-${placeholderIndex}`} word={word} index={placeholderIndex} />;
                                  }
                                  return <span key={`text-${idx}`} className="text-base font-bold text-gray-700">{part}</span>;
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Drag words to build your response</h3>
                        <div className="flex flex-wrap gap-3 justify-center">
                          {shuffledWords.map((word) => <DraggableWord key={word} id={word} word={word} isUsed={placedWords.includes(word)} />)}
                        </div>
                      </div>
                    </DndContext>
                  </div>
                  {isQuestionLocked(questions[currentIndex]) && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-8">
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white/50 max-w-lg text-center">
                        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"><Lock size={40} /></div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4">付费内容已锁定</h3>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">本题目为进阶课程内容。请登录并确保账号在有效期内，或添加eva微信获取考试真题。</p>
                        <div className="space-y-4">
                          {!user ? <button onClick={() => setView('login')} className="w-full py-4 bg-teal-600 text-white rounded-2xl font-black text-lg hover:bg-teal-700 transition-all shadow-lg">立即登录</button> : <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 flex flex-col items-center gap-4"><div className="text-center"><p className="text-orange-800 font-bold text-lg">微信号：eva-180</p><p className="text-orange-600 text-sm font-medium">添加eva微信获取考试真题</p></div></div>}
                          <button onClick={() => setView('home')} className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all">返回首页</button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-[3rem] p-8 md:p-12 text-center shadow-xl border border-gray-100 max-w-4xl mx-auto">
                  <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><Trophy size={48} /></div>
                  <h2 className="text-4xl font-black text-gray-900 mb-2">Practice Complete!</h2>
                  <p className="text-gray-500 text-lg mb-8">Great job! Here's how you performed in this set.</p>
                  {currentSet?.isFree && (
                    <div className="mb-10 p-6 bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl text-white shadow-xl relative overflow-hidden">
                      <div className="relative z-10">
                        <h3 className="text-xl font-black mb-2 flex items-center justify-center gap-2"><Sparkles size={24} /> 基础练习完成！</h3>
                        <p className="text-teal-50 leading-relaxed mb-6">想要解锁更多练习题目，请联系 Eva 老师：</p>
                        <div className="flex flex-col items-center gap-4"><div className="inline-block px-8 py-3 bg-white text-teal-700 rounded-2xl font-black text-2xl shadow-lg border border-teal-100">微信号: eva-180</div></div>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-6 mb-12">
                    <div className="bg-gray-50 p-6 rounded-3xl"><p className="text-xs font-bold text-gray-400 uppercase mb-1">Accuracy</p><p className="text-4xl font-black text-teal-600">{Math.round((score / questions.length) * 100)}%</p></div>
                    <div className="bg-gray-50 p-6 rounded-3xl"><p className="text-xs font-bold text-gray-400 uppercase mb-1">Time Taken</p><p className="text-4xl font-black text-gray-900">{formatTime(timeTaken)}</p></div>
                  </div>
                  
                  {/* 进步对比：个性化练习后展示 */}
                  {diagnosticAnalysis && currentSet?.id !== 'assessment-diagnostic' && errorAnalysis && (
                    <div className="mb-10 p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-3xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                          <Trophy size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-gray-900">进步对比</h3>
                          <p className="text-xs text-gray-400">诊断测试 vs 本次练习</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-white rounded-2xl border border-gray-100">
                          <p className="text-xs text-gray-400 mb-1">诊断正确率</p>
                          <p className="text-2xl font-black text-gray-600">{diagnosticAnalysis.accuracyRate}%</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-2xl border border-gray-100">
                          <p className="text-xs text-gray-400 mb-1">本次正确率</p>
                          <p className="text-2xl font-black text-teal-600">{errorAnalysis.accuracyRate}%</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-2xl border border-gray-100">
                          <p className="text-xs text-gray-400 mb-1">提升</p>
                          <p className={`text-2xl font-black ${errorAnalysis.accuracyRate >= diagnosticAnalysis.accuracyRate ? 'text-green-600' : 'text-red-600'}`}>
                            {errorAnalysis.accuracyRate >= diagnosticAnalysis.accuracyRate ? '+' : ''}{errorAnalysis.accuracyRate - diagnosticAnalysis.accuracyRate}%
                          </p>
                        </div>
                      </div>
                      
                      {/* 各类型错因改善情况 */}
                      {(() => {
                        const improvements = diagnosticAnalysis.patterns.map(dp => {
                          const beforeP = dp.percentage;
                          const afterP = errorAnalysis.patterns.find(p => p.type === dp.type)?.percentage || 0;
                          return { type: dp.type, label: dp.type, before: beforeP, after: afterP, change: beforeP - afterP };
                        }).filter(i => i.change > 0);
                        return improvements.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs text-gray-500">改善的薄弱环节：</span>
                            {improvements.map(i => (
                              <span key={i.type} className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold">
                                {i.label} ↓{i.change}%
                              </span>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  {/* 错因分析与提升练习 */}
                  {errorAnalysis && errorAnalysis.totalErrors > 0 && (
                    <div className="mb-12">
                      <ErrorFeedback
                        analysis={errorAnalysis}
                        isDiagnostic={currentSet?.id === 'assessment-diagnostic'}
                        comparisonAnalysis={currentSet?.id !== 'assessment-diagnostic' ? diagnosticAnalysis : null}
                        onStartTargetedPractice={() => {
                          if (currentSet?.id === 'assessment-diagnostic' && errorAnalysis) {
                            // 诊断测试完成 → 生成个性化练习套题
                            setDiagnosticAnalysis(errorAnalysis);
                            const personalized = generatePersonalizedSet({
                              weakAreas: errorAnalysis.weakAreas,
                              patterns: errorAnalysis.patterns,
                              correctIds: correctQuestionIds,
                            });
                            startSet(personalized);
                          } else {
                            setView('targeted-practice');
                          }
                        }}
                      />
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => setView('home')} className="px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20">Back to Home</button>
                    <button onClick={() => startSet(currentSet!)} className="px-8 py-4 bg-white text-teal-600 border-2 border-teal-600 rounded-2xl font-bold text-lg hover:bg-teal-50 transition-all">Try Again</button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
          {view === 'targeted-practice' && errorAnalysis && (
            <TargetedPractice
              weakAreas={errorAnalysis.weakAreas}
              originalQuestions={questions}
              availableSets={availableSets.filter(Boolean).map(s => ({ id: s.id, name: s.name, isFree: s.isFree }))}
              correctQuestionIds={correctQuestionIds}
              onBack={() => setView('quiz')}
              onComplete={() => setView('home')}
            />
          )}
        </AnimatePresence>
      </main>

      {/* 游客联系信息弹窗 - 固定全屏覆盖 */}
      {showGuestModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-teal-100 w-full max-w-md"
          >
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">练习完成！🎉</h3>
            <p className="text-gray-600 mb-8 leading-relaxed font-medium">
              为了方便 Eva 老师为你提供后续点评及学习建议，请留下你的称呼或微信号：
            </p>
            <form onSubmit={handleGuestSubmit} className="space-y-6">
              <input 
                type="text"
                value={guestContact}
                onChange={(e) => setGuestContact(e.target.value)}
                placeholder="昵称 / 微信号 (选填)"
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-medium text-center"
              />
              <button 
                type="submit"
                className="w-full py-4 bg-teal-600 text-white rounded-2xl font-black text-lg hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
              >
                提交并看分
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
