export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  role: 'admin' | 'student' | 'guest_student';
  expiresAt: string;
}

// ===== 旧版 BAS 考点体系 v2.1（仅 seedQuestions 兼容保留，新代码请用 PrimaryCategory） =====
export type ErrorType =
  // 纯语序考点
  | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7'
  // 语序+词汇组合
  | 'A1+B1' | 'A1+B2' | 'A1+B3' | 'A1+B4' | 'A1+B5'
  | 'A2+B1' | 'A2+B2' | 'A2+B3' | 'A2+B4' | 'A2+B5'
  | 'A3+B1' | 'A3+B2' | 'A3+B3' | 'A3+B4' | 'A3+B5'
  | 'A4+B1' | 'A4+B2' | 'A4+B3' | 'A4+B4' | 'A4+B5'
  | 'A5+B1' | 'A5+B2' | 'A5+B3' | 'A5+B4' | 'A5+B5'
  | 'A6+B1' | 'A6+B2' | 'A6+B3' | 'A6+B4' | 'A6+B5'
  | 'A7+B1' | 'A7+B2' | 'A7+B3' | 'A7+B4' | 'A7+B5'
  // 语序组合
  | 'A1+A2' | 'A1+A3' | 'A1+A4' | 'A1+A5' | 'A1+A6' | 'A1+A7'
  | 'A2+A3' | 'A2+A4' | 'A2+A5' | 'A2+A6' | 'A2+A7'
  | 'A3+A4' | 'A3+A5' | 'A3+A6' | 'A3+A7'
  | 'A4+A5' | 'A4+A6' | 'A4+A7'
  | 'A5+A6' | 'A5+A7'
  | 'A6+A7'
  // 语序+多词汇组合
  | 'A1+B1+B2' | 'A1+B1+B3' | 'A1+B1+B4' | 'A1+B1+B5'
  | 'A2+B1+B2' | 'A2+B1+B3' | 'A2+B1+B4' | 'A2+B1+B5'
  | 'A3+B1+B2' | 'A3+B1+B3' | 'A3+B1+B4' | 'A3+B1+B5'
  | 'A4+B1+B2' | 'A4+B1+B3' | 'A4+B1+B4' | 'A4+B1+B5'
  | 'A5+B1+B2' | 'A5+B1+B3' | 'A5+B1+B4' | 'A5+B1+B5'
  | 'A6+B1+B2' | 'A6+B1+B3' | 'A6+B1+B4' | 'A6+B1+B5'
  | 'A7+B1+B2' | 'A7+B1+B3' | 'A7+B1+B4' | 'A7+B1+B5'
  | 'A5+A7';

// ===== 新版标签体系（HTML 报告驱动） =====
export type PrimaryCategory = '从句逻辑' | '词序排列' | '修饰语位置' | '谓语架构' | '特殊句式';

// 干扰词错因预测
export interface ErrorPrediction {
  wrongWord: string;       // 干扰词
  replaces: string;        // 它可能替换的正确词
  errorType: PrimaryCategory; // 错因分类
  hint: string;            // 错因解释
}

export interface Question {
  id: number;
  setId: string;
  isFree?: boolean;
  // 新版标签体系
  primaryCategory?: PrimaryCategory; // 主分类（从句逻辑/词序排列/修饰语位置/谓语架构/特殊句式）
  keyPoints?: string[];              // 考点关键词列表
  difficulty?: 1 | 2 | 3 | 4 | 5;    // 难度 1-5
  hint?: string;                      // 针对这道题的规则提示（逐题定制）
  errorPredictions?: ErrorPrediction[]; // 干扰词错因预测（AI生成）
  // 旧版标签体系（仅 seedQuestions 兼容保留）
  targetErrorType?: ErrorType;
  ruleHint?: string;
  conversation: {
    speaker1: {
      avatar: string;
      text: string;
    };
    speaker2: {
      avatar: string;
    };
  };
  template: string;
  correctSentence: string[];
  words: string[];
}

export interface QuestionSet {
  id: string;
  name: string;
  isFree: boolean;
  questions?: Question[];
  questionCount?: number;
  timeLimit?: number; // 做题时间限制，单位：秒
  order?: number; // 题组排序顺序
  createdAt?: any;
}

export interface UserResult {
  id: string;
  userId: string;
  setId: string;
  setName: string;
  score: number; // Percentage
  totalQuestions: number;
  correctCount: number;
  timeSpent: number; // in seconds
  timestamp: string;
  details: {
    questionId: number;
    userAnswer: string[];
    correctAnswer: string[];
    isCorrect: boolean;
    analysis?: string;
    hint?: string;         // 新版标签提示
    ruleHint?: string;     // 旧版标签提示（兼容已保存的历史数据）
    // === Trace 行为追踪字段 ===
    timeSpent?: number;    // 每道题用时（秒）
    modifications?: number; // 修改次数
    firstAnswerTime?: string; // 首次作答时间戳
    submitTime?: string;   // 提交时间戳
  }[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: (string | null)[][];
  timeRemaining: number;
  isFinished: boolean;
}
