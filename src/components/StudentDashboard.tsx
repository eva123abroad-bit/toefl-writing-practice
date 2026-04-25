import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  BarChart3,
  Calendar,
  ChevronRight,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserResult } from '../types';
import { cn } from './lib/utils';
import { practicePool } from '../data/practicePool';
import { assessmentSet } from '../data/assessmentSet';
import { seedQuestionSet } from '../data/seedQuestions';
import { PrimaryCategory, getCategoryLabel, getCategoryColors } from '../utils/errorAnalysis';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface StudentDashboardProps {
  userId: string;
  onBack: () => void;
  onSelectSet: (setId: string) => void;
}

const FIVE_CATEGORIES: PrimaryCategory[] = ['词序排列', '修饰语位置', '从句逻辑', '谓语架构', '特殊句式'];

export default function StudentDashboard({ userId, onBack, onSelectSet }: StudentDashboardProps) {
  const [results, setResults] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const q = query(
          collection(db, 'results'),
          where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().timestamp
        })) as UserResult[];
        
        data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        setResults(data);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, `results?userId=${userId}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [userId]);

  const stats = useMemo(() => {
    if (results.length === 0) return { totalSessions: 0, totalCorrect: 0, overallAccuracy: 0, avgTime: 0 };
    const totalSessions = results.length;
    const totalCorrect = results.reduce((acc, r) => acc + (r.correctCount || 0), 0);
    const totalQuestions = results.reduce((acc, r) => acc + (r.totalQuestions || 0), 0);
    const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const totalTime = results.reduce((acc, r) => acc + (r.timeSpent || 0), 0);
    const avgTime = totalSessions > 0 ? Math.round(totalTime / totalSessions) : 0;
    return { totalSessions, totalCorrect, overallAccuracy, avgTime };
  }, [results]);

  const categoryStats = useMemo(() => {
    const catData: Record<string, { correct: number; total: number }> = {};
    FIVE_CATEGORIES.forEach(cat => { catData[cat] = { correct: 0, total: 0 }; });
    results.forEach(result => {
      (result.details || []).forEach(detail => {
        let poolQ: any = undefined;
        if (detail.questionId) {
          poolQ = practicePool.questions?.find(q => q.id === detail.questionId)
            || assessmentSet.questions?.find(q => q.id === detail.questionId)
            || seedQuestionSet.questions?.find(q => q.id === detail.questionId);
        }
        if (!poolQ) {
          const allSets = [practicePool, assessmentSet, seedQuestionSet];
          for (const s of allSets) {
            poolQ = s.questions?.find(q => JSON.stringify(q.correctSentence) === JSON.stringify(detail.correctAnswer));
            if (poolQ) break;
          }
        }
        const cat = poolQ?.primaryCategory;
        if (cat && catData[cat]) {
          catData[cat].total++;
          if (detail.isCorrect) catData[cat].correct++;
        }
      });
    });
    return FIVE_CATEGORIES.map(cat => ({
      category: getCategoryLabel(cat),
      accuracy: catData[cat].total > 0 ? Math.round((catData[cat].correct / catData[cat].total) * 100) : 0,
      correct: catData[cat].correct,
      total: catData[cat].total,
      fullMark: 100,
    }));
  }, [results]);

  const recentResults = useMemo(() => results.slice(0, 10), [results]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Back to Practice
            </button>
            <h1 className="text-3xl font-bold text-gray-900">My Progress</h1>
            <p className="text-gray-500">Track your performance across all question sets.</p>
          </div>
        </header>

        {/* 4个统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-teal-50 text-teal-600 rounded-lg"><BookOpen size={18} /></div>
              <span className="text-xs font-bold text-gray-400 uppercase">总练习次数</span>
            </div>
            <p className="text-2xl font-black text-gray-900">{stats.totalSessions}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle2 size={18} /></div>
              <span className="text-xs font-bold text-gray-400 uppercase">正确总题数</span>
            </div>
            <p className="text-2xl font-black text-gray-900">{stats.totalCorrect}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><TrendingUp size={18} /></div>
              <span className="text-xs font-bold text-gray-400 uppercase">整体正确率</span>
            </div>
            <p className="text-2xl font-black text-gray-900">{stats.overallAccuracy}%</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Clock size={18} /></div>
              <span className="text-xs font-bold text-gray-400 uppercase">平均用时</span>
            </div>
            <p className="text-2xl font-black text-gray-900">{Math.floor(stats.avgTime / 60)}:{(stats.avgTime % 60).toString().padStart(2, '0')}</p>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No results yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Complete your first practice set to see your progress and detailed analysis here.
            </p>
            <button 
              onClick={onBack}
              className="px-8 py-3 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-700 transition-all shadow-lg"
            >
              Start Practicing
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 能力雷达图 */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Target size={20} /></div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">能力雷达图</h3>
                  <p className="text-xs text-gray-400">5大考点正确率分布</p>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={categoryStats}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fontWeight: 600, fill: '#6b7280' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                    <Radar name="正确率" dataKey="accuracy" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-3">
                {categoryStats.map((stat, idx) => {
                  const cat = FIVE_CATEGORIES[idx];
                  const colors = getCategoryColors(cat);
                  return (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-24 shrink-0">{stat.category}</span>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all", colors.bg.replace('50', '400'))} style={{ width: `${stat.accuracy}%` }} />
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-12 text-right">{stat.accuracy}%</span>
                      <span className="text-xs text-gray-400 w-16 text-right">({stat.correct}/{stat.total})</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 历史练习记录 */}
            {recentResults.map((result) => (
              <div key={result.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
                        result.score >= 80 ? "bg-green-50 text-green-600" : 
                        result.score >= 50 ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600"
                      )}>
                        {result.score}%
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{result.setName}</h3>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {new Date(result.timestamp).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 size={12} /> {result.correctCount}/{result.totalQuestions} Correct
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => onSelectSet(result.setId)}
                      className="flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700"
                    >
                      Retake Set <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="border-t border-gray-50 pt-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">Detailed Review</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {result.details.map((detail, idx) => (
                        <div key={idx} className={cn(
                          "p-4 rounded-xl border-l-4 text-sm",
                          detail.isCorrect ? "bg-green-50/50 border-green-500" : "bg-red-50/50 border-red-500"
                        )}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-gray-700">Question {idx + 1}</span>
                            {detail.isCorrect ? (
                              <span className="text-green-600 flex items-center gap-1 font-bold text-xs">
                                <CheckCircle2 size={14} /> Correct
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center gap-1 font-bold text-xs">
                                <XCircle size={14} /> Incorrect
                              </span>
                            )}
                          </div>
                          <div className="space-y-2">
                            <p className="text-gray-600 italic">
                              <span className="font-bold not-italic text-gray-400 mr-2">Your:</span>
                              "{detail.userAnswer.join(' ')}"
                            </p>
                            {!detail.isCorrect && (
                              <p className="text-teal-700">
                                <span className="font-bold text-teal-600/50 mr-2">Correct:</span>
                                "{detail.correctAnswer.join(' ')}"
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
