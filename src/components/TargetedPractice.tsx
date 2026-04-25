import React, { useState, useEffect, useMemo } from 'react';
import { Target, ArrowLeft, Check, X, RefreshCw } from 'lucide-react';
import { cn } from './lib/utils';
import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseReady } from '../firebase';
import { seedQuestionSet, assessmentSet } from '../data/seedQuestions';
import { PrimaryCategory, getCategoryLabel, getCategoryColors, getCategoryTips } from '../utils/errorAnalysis';

interface Question {
  id: number;
  setId: string;
  primaryCategory?: PrimaryCategory;
  keyPoints?: string[];
  difficulty?: 1 | 2 | 3 | 4 | 5;
  hint?: string;
  targetErrorType?: string; // 兼容旧版
  ruleHint?: string;
  conversation: { speaker1: { avatar: string; text: string }; speaker2: { avatar: string } };
  template: string;
  correctSentence: string[];
  words: string[];
  isFree?: boolean;
}

interface QuestionSetInfo { id: string; name: string; isFree: boolean }

interface TargetedPracticeProps {
  weakAreas: string[];
  originalQuestions: Question[];
  availableSets: QuestionSetInfo[];
  correctQuestionIds: Set<number>;
  onBack: () => void;
  onComplete: () => void;
}

export default function TargetedPractice({ weakAreas, originalQuestions, availableSets, correctQuestionIds, onBack, onComplete }: TargetedPracticeProps) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [placedWords, setPlacedWords] = useState<(string | null)[]>([]);
  const [results, setResults] = useState<{ isCorrect: boolean; userAnswer: string[]; correctAnswer: string[] }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const all: Question[] = [];
        if (isFirebaseReady && db) {
          for (const set of availableSets) {
            const snap = await getDoc(doc(db, 'questions', set.id));
            if (snap.exists()) {
              const qs = (snap.data().questions || []).map((q: any, i: number) => ({ ...q, id: q.id ?? i, setId: set.id, isFree: set.isFree }));
              all.push(...qs);
            }
          }
        } else {
          // Firebase 未配置时，从种子数据 + 诊断测试 + 练习池获取题目
          const localSets = [seedQuestionSet, assessmentSet];
          const seenIds = new Set<number>();
          for (const set of localSets) {
            for (const q of (set.questions || [])) {
              const qId = q.id ?? Math.random();
              if (!seenIds.has(qId)) {
                seenIds.add(qId);
                all.push({ ...q, id: qId, setId: set.id, isFree: set.isFree });
              }
            }
          }
        }
        // Filter out already-correct and current-session questions
        const candidates = all.filter(q => !correctQuestionIds.has(q.id) && !originalQuestions.some(oq => oq.id === q.id));
        // Score and prioritize
        const scored = candidates.map(q => {
          let s = 0;
          const distractors = q.words.filter(w => !q.correctSentence.some(cw => cw.toLowerCase() === w.toLowerCase())).length;
          const blanks = (q.template.match(/\{\d+\}/g) || []).length;
          // v3.0: 按考点标签匹配薄弱环节（优先 primaryCategory）
          const qCat = q.primaryCategory || (q.targetErrorType ? q.targetErrorType.split('+')[0] : undefined);
          if (qCat) {
            // 精确匹配
            if (weakAreas.includes(qCat)) s += 5;
            // 部分匹配（A-tag 层面）
            const weakATags = weakAreas.map(w => w.split('+')[0]);
            if (weakATags.includes(qCat)) s += 3;
          }
          // 启发式加分：干扰词多、句子长
          if (distractors > 0) s += distractors;
          if (q.correctSentence.length > 4) s += 1;
          return { q, s };
        });
        scored.sort((a, b) => b.s - a.s);
        setQuestions(scored.slice(0, 10).map(x => x.q));
      } catch (e) { console.error('Load targeted questions error:', e); }
      finally { setLoading(false); }
    };
    load();
  }, [weakAreas, originalQuestions, availableSets, correctQuestionIds]);

  const initQ = (q: Question) => {
    const n = (q.template.match(/\{\d+\}/g) || []).length;
    setPlacedWords(new Array(n).fill(null));
  };

  useEffect(() => { if (questions.length > 0) initQ(questions[currentIdx]); }, [currentIdx, questions]);

  const handleWordClick = (word: string) => {
    const emptyIdx = placedWords.indexOf(null);
    if (emptyIdx === -1) return;
    const next = [...placedWords]; next[emptyIdx] = word; setPlacedWords(next);
  };

  const handleSlotClick = (idx: number) => {
    if (placedWords[idx]) { const next = [...placedWords]; next[idx] = null; setPlacedWords(next); }
  };

  const handleDrop = (slotIdx: number) => {
    // Simple click-based for now; drag not required for MVP
  };

  const nextQ = () => {
    const q = questions[currentIdx];
    const ok = JSON.stringify(placedWords) === JSON.stringify(q.correctSentence);
    const newResults = [...results, { isCorrect: ok, userAnswer: placedWords.map(w => w || ''), correctAnswer: q.correctSentence }];
    setResults(newResults);
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
    else setIsFinished(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div><p className="text-gray-500">正在匹配练习题...</p></div></div>;

  if (!questions.length) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="bg-white rounded-3xl p-8 text-center"><h3 className="font-black text-lg mb-2">暂无更多题目</h3><button onClick={onBack} className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold">返回</button></div></div>;

  if (isFinished) {
    const cc = results.filter(r => r.isCorrect).length;
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 text-center shadow-lg">
          <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6", cc >= 8 ? "bg-green-100 text-green-600" : cc >= 5 ? "bg-orange-100 text-orange-600" : "bg-red-100 text-red-600")}><Target size={40} /></div>
          <h2 className="text-2xl font-black mb-2">提升练习完成！</h2>
          <p className="text-gray-500 mb-6">正确率 {Math.round((cc / results.length) * 100)}% ({cc}/{results.length})</p>
          <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
            {results.map((r, i) => (
              <div key={i} className={cn("p-3 rounded-xl text-sm text-left", r.isCorrect ? "bg-green-50" : "bg-red-50")}>
                <span className="text-xs font-bold text-gray-400 mr-2">Q{i+1}</span>
                {r.isCorrect ? <span className="text-green-600 text-xs"><Check size={12} className="inline" /></span> : (
                  <div><p className="text-red-600">你的：{r.userAnswer.filter(w=>w).join(' ')}</p><p className="text-teal-700 font-bold">正确：{r.correctAnswer.join(' ')}</p></div>
                )}
              </div>
            ))}
          </div>
          <button onClick={onComplete} className="px-8 py-3 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700">完成</button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  const usedWords = new Set(placedWords.filter(w => w).map(w => w!.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-bold"><ArrowLeft size={20} />退出</button>
          <div className="flex items-center gap-3">
            {weakAreas.map(t => {
              const catColors = getCategoryColors(t as PrimaryCategory);
              return <span key={t} className={cn("px-2 py-0.5 rounded-full text-xs font-bold", catColors.light, catColors.text)}>{getCategoryLabel(t as PrimaryCategory) || t}</span>;
            })}
            <span className="text-sm font-bold text-gray-400">{currentIdx+1}/{questions.length}</span>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full"><div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${((currentIdx+1)/questions.length)*100}%` }} /></div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal-100 overflow-hidden flex-shrink-0"><img src={q.conversation.speaker1.avatar} alt="" className="w-full h-full object-cover" /></div>
            <div className="bg-teal-50 p-4 rounded-2xl rounded-tl-none flex-1"><p className="font-medium text-teal-900">{q.conversation.speaker1.text}</p></div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200 mb-6">
            <div className="flex flex-wrap gap-2 items-center justify-center">
              {q.template.split(/(\{\d+\})/g).filter(p=>p).map((part, idx) => {
                const m = part.match(/^\{(\d+)\}$/);
                if (m) {
                  const si = parseInt(m[1]);
                  const w = placedWords[si];
                  return <div key={idx} className={cn("min-w-[80px] h-10 border-b-2 flex items-center justify-center px-2 cursor-pointer", w ? "border-teal-500 bg-teal-50" : "border-gray-300")} onClick={() => handleSlotClick(si)}>
                    {w ? <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-sm font-medium">{w}</span> : <span className="text-gray-300 text-sm">___</span>}
                  </div>;
                }
                return <span key={idx} className="font-medium text-gray-700">{part}</span>;
              })}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {useMemo(() => {
              const arr = [...q.words];
              for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
              }
              return arr;
            }, [currentIdx]).map((word) => {
              const used = usedWords.has(word.toLowerCase());
              return <button key={word} onClick={() => !used && handleWordClick(word)} disabled={used} className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all", used ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-400 hover:bg-teal-50")}>{word}</button>;
            })}
          </div>
          <div className="flex justify-end">
            <button onClick={nextQ} className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 flex items-center gap-2">
              {currentIdx < questions.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
