import { QuestionSet, ErrorType } from '../types';

// 保留原有示例题组
export const seedQuestionSet: QuestionSet = {
  id: 'seed-set-1',
  name: 'BSA 拖拽排序练习 - 示例题组',
  isFree: true,
  questionCount: 5,
  timeLimit: 600,
  questions: [
    { id: 1, setId: 'seed-set-1', isFree: true, targetErrorType: 'A7+B2' as ErrorType,
      ruleHint: '注意区分 yesterday 和 last night 的时间搭配',
      conversation: { speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', text: 'Did you finish the homework yesterday?' }, speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam' } },
      template: '{0} {1} {2} {3} {4} .', correctSentence: ['I', 'finished', 'it', 'last', 'night'],
      words: ['night', 'I', 'last', 'finished', 'it', 'yesterday', 'was'],
      errorPredictions: [
        { wrongWord: 'yesterday', replaces: 'last night', errorType: '修饰语位置', hint: 'yesterday 与 last night 混淆，时间状语重复或位置不当。' },
        { wrongWord: 'was', replaces: 'finished', errorType: '谓语架构', hint: 'was 是be动词，与过去分词构成被动，但此处需主动过去时。' }
      ] },
    { id: 2, setId: 'seed-set-1', isFree: true, targetErrorType: 'A5+B1+B2' as ErrorType,
      ruleHint: 'when 引导状语从句，主句 "I was studying" 用过去进行时，从句 "the phone rang" 用一般过去时；注意不用 were（I 搭 was）',
      conversation: { speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher', text: 'What were you doing when the phone rang?' }, speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Student' } },
      template: '{0} {1} {2} when {3} {4} {5} .', correctSentence: ['I', 'was', 'studying', 'the', 'phone', 'rang'],
      words: ['rang', 'I', 'was', 'studying', 'the', 'phone', 'were', 'studied'],
      errorPredictions: [
        { wrongWord: 'were', replaces: 'was', errorType: '谓语架构', hint: '主语是I，谓语应用was，were用于复数主语。' },
        { wrongWord: 'studied', replaces: 'studying', errorType: '谓语架构', hint: '过去进行时需用be+现在分词，studied是过去式。' }
      ] },
    { id: 3, setId: 'seed-set-1', isFree: true, targetErrorType: 'A7+B1+B5' as ErrorType,
      ruleHint: '习惯性动作用一般现在时 take（不是 took），注意 the subway 要用冠词 the，不能用复数 subways',
      conversation: { speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', text: 'How do you usually get to work?' }, speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' } },
      template: '{0} {1} {2} {3} {4} .', correctSentence: ['I', 'usually', 'take', 'the', 'subway'],
      words: ['subway', 'I', 'take', 'usually', 'the', 'took', 'subways'],
      errorPredictions: [
        { wrongWord: 'took', replaces: 'take', errorType: '谓语架构', hint: '一般现在时表示习惯，不能用过去式took。' },
        { wrongWord: 'subways', replaces: 'subway', errorType: '修饰语位置', hint: 'the subway是固定说法，表示交通工具，不用复数。' }
      ] },
    { id: 4, setId: 'seed-set-1', isFree: true, targetErrorType: 'A1+B1+B5' as ErrorType,
      ruleHint: '回答 where 问句用 "I bought it at a bookstore"，注意 bought 是 buy 的过去式，a bookstore 用不定冠词 a',
      conversation: { speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', text: 'Where did you buy this book?' }, speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' } },
      template: '{0} {1} {2} {3} {4} {5} .', correctSentence: ['I', 'bought', 'it', 'at', 'a', 'bookstore'],
      words: ['bookstore', 'a', 'bought', 'it', 'I', 'at', 'buy', 'an'],
      errorPredictions: [
        { wrongWord: 'buy', replaces: 'bought', errorType: '谓语架构', hint: '误用动词原形，忽略了过去时态变化。' },
        { wrongWord: 'an', replaces: 'a', errorType: '修饰语位置', hint: '误用an，但bookstore以辅音音素开头，应用a。' }
      ] },
    { id: 5, setId: 'seed-set-1', isFree: true, targetErrorType: 'A7+B1+B3' as ErrorType,
      ruleHint: '陈述观点用 "I think it will..."，will 后接动词原形 benefit（不是 benefits），不用 would（语气太弱）',
      conversation: { speaker1: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Reporter', text: 'What do you think about the new policy?' }, speaker2: { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Official' } },
      template: '{0} {1} {2} {3} {4} {5} {6} .', correctSentence: ['I', 'think', 'it', 'will', 'benefit', 'everyone', 'soon'],
      words: ['soon', 'I', 'will', 'it', 'think', 'everyone', 'benefit', 'would', 'benefits'],
      errorPredictions: [
        { wrongWord: 'would', replaces: 'will', errorType: '谓语架构', hint: '误将一般将来时改为过去将来时，但句意无过去语境。' },
        { wrongWord: 'benefits', replaces: 'benefit', errorType: '谓语架构', hint: '误用第三人称单数，但will后需接动词原形。' }
      ] },
  ]
};

// 诊断测试套题
export { assessmentSet } from './assessmentSet';
// 练习题池
export { practicePool } from './practicePool';

// 获取种子题目（可指定数量）
export function getSeedQuestions(count: number = 5): QuestionSet {
  if (count >= 5) return seedQuestionSet;
  return { ...seedQuestionSet, questions: seedQuestionSet.questions!.slice(0, count), questionCount: count };
}
