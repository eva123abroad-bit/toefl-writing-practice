import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  BarChart3,
  Calendar,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserResult } from '../types';
import { cn } from './lib/utils';

interface StudentDashboardProps {
  userId: string;
  onBack: () => void;
  onSelectSet: (setId: string) => void;
}

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
          timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || doc.data().timestamp
        })) as UserResult[];
        
        // Sort in memory to avoid composite index requirement
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
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
          
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Avg. Score</p>
                <p className="text-xl font-bold text-gray-900">
                  {results.length > 0 
                    ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length) 
                    : 0}%
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Sets Done</p>
                <p className="text-xl font-bold text-gray-900">{results.length}</p>
              </div>
            </div>
          </div>
        </header>

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
            {results.map((result) => (
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
