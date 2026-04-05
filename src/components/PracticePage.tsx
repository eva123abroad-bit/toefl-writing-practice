import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft,
  Send,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { db } from '../firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface QuestionSet {
  id: string;
  name: string;
  questionCount?: number;
}

interface Question {
  id: string;
  text: string;
  type?: string;
}

interface AppUser {
  uid: string;
  email: string | null;
  role: string;
}

interface PracticePageProps {
  questionSet: QuestionSet;
  user: AppUser;
  onBack: () => void;
  guestSessionId: string | null;
}

const PracticePage: React.FC<PracticePageProps> = ({ questionSet, user, onBack, guestSessionId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  
  // 微信收集弹窗
  const [showWechatPopup, setShowWechatPopup] = useState(false);
  const [wechatNickname, setWechatNickname] = useState('');
  const [wechatId, setWechatId] = useState('');
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // 加载题目
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const docRef = doc(db, 'questions', questionSet.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          // 假设题目存储在 questions 数组字段中
          const qList = data.questions || [];
          setQuestions(qList);
        }
      } catch (error) {
        console.error("获取题目失败:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [questionSet.id]);

  // 处理答案输入
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // 提交练习
  const handleSubmit = async () => {
    setSubmitted(true);
    
    // 记录练习数据（不管是否填写微信）
    try {
      await addDoc(collection(db, 'practiceRecords'), {
        userId: user.uid,
        userEmail: user.email,
        setId: questionSet.id,
        setName: questionSet.name,
        answers: answers,
        completedAt: serverTimestamp(),
        source: 'registered_user',
      });
    } catch (error) {
      console.error("记录练习失败:", error);
    }
    
    // 弹出微信收集弹窗
    setShowWechatPopup(true);
  };

  // 提交微信信息
  const handleSubmitWechat = async () => {
    setSubmittingLead(true);
    try {
      await addDoc(collection(db, 'leads'), {
        sessionId: guestSessionId || user.uid,
        userId: user.uid,
        userEmail: user.email,
        setId: questionSet.id,
        setName: questionSet.name,
        wechatNickname: wechatNickname.trim() || null,
        wechatId: wechatId.trim() || null,
        createdAt: serverTimestamp(),
        source: 'practice_completion',
      });
      setLeadSubmitted(true);
    } catch (error) {
      console.error("提交微信信息失败:", error);
    } finally {
      setSubmittingLead(false);
    }
  };

  // 跳过微信填写
  const handleSkipWechat = () => {
    setShowWechatPopup(false);
  };

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-teal-600"></div>
      </div>
    );
  }

  // 没有题目
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-500 font-bold mb-6">该题库暂无题目</p>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
          返回题库
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const currentAnswer = answers[currentQuestion?.id] || '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-bold transition-colors"
          >
            <ArrowLeft size={20} />
            返回
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-400">
              {currentIndex + 1} / {questions.length}
            </span>
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* 题目卡片 */}
        <div className="bg-white rounded-[2rem] p-10 shadow-sm border-2 border-gray-100 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center font-black text-sm">
              {currentIndex + 1}
            </div>
            <div>
              <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
                {questionSet.name}
              </span>
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-gray-900 leading-relaxed mb-8">
            {currentQuestion.text}
          </h2>

          {/* 答案输入 */}
          <div className="relative">
            <textarea
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              placeholder="在此输入你的写作..."
              className="w-full h-64 p-6 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-teal-500 font-medium text-lg resize-none"
              disabled={submitted}
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-400">
              {currentAnswer.length} 字
            </div>
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors",
              currentIndex === 0 
                ? "text-gray-300 cursor-not-allowed" 
                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
            )}
          >
            <ChevronLeft size={20} />
            上一题
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-xl font-black transition-all",
                submitted
                  ? "bg-green-500 text-white"
                  : "bg-teal-600 text-white hover:bg-teal-700 shadow-xl shadow-teal-100"
              )}
            >
              {submitted ? (
                <>
                  <CheckCircle2 size={20} />
                  已提交
                </>
              ) : (
                <>
                  提交练习
                  <Send size={20} />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              className="flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-xl font-black hover:bg-teal-700 transition-colors shadow-xl shadow-teal-100"
            >
              下一题
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </main>

      {/* 微信收集弹窗 */}
      {showWechatPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-10 shadow-2xl">
            {leadSubmitted ? (
              /* 已提交状态 */
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  提交成功！
                </h3>
                <p className="text-gray-500 font-medium mb-8">
                  Eva 老师会尽快添加你的微信，提供专业点评反馈
                </p>
                <button
                  onClick={() => setShowWechatPopup(false)}
                  className="w-full py-4 bg-teal-600 text-white rounded-xl font-black hover:bg-teal-700 transition-colors"
                >
                  查看答案解析
                </button>
              </div>
            ) : (
              /* 微信收集表单 */
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    获得 Eva 老师专业点评
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    留下你的微信，练习完成后获得一对一反馈
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      微信昵称（选填）
                    </label>
                    <input
                      type="text"
                      value={wechatNickname}
                      onChange={(e) => setWechatNickname(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 rounded-xl outline-none border-2 border-transparent focus:border-teal-500 font-medium"
                      placeholder="方便 Eva 老师称呼你"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      微信号（选填）
                    </label>
                    <input
                      type="text"
                      value={wechatId}
                      onChange={(e) => setWechatId(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 rounded-xl outline-none border-2 border-transparent focus:border-teal-500 font-medium"
                      placeholder="Eva 老师会主动添加你"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSubmitWechat}
                    disabled={submittingLead}
                    className="w-full py-4 bg-teal-600 text-white rounded-xl font-black text-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    {submittingLead ? '提交中...' : '提交获得点评'}
                  </button>
                  <button
                    onClick={handleSkipWechat}
                    className="w-full py-3 text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors"
                  >
                    稍后再说，直接查看答案
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticePage;
