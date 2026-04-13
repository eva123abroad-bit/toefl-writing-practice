export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  role: 'admin' | 'student' | 'guest_student';
  expiresAt: string;
}

export interface Question {
  id: number;
  setId: string;
  isFree?: boolean;
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
  }[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: (string | null)[][];
  timeRemaining: number;
  isFinished: boolean;
}
