/**
 * 个性化组题算法
 * 根据学生的诊断测试错因分布，组装个性化练习套题
 */

import { Question, QuestionSet, PrimaryCategory } from '../types';
import { ErrorPattern, ERROR_TYPE_LABELS, getCategoryLabel } from './errorAnalysis';
import { practicePool } from '../data/practicePool';

export interface PersonalizedConfig {
  weakAreas: string[];            // PrimaryCategory 或旧 ErrorType（兼容）
  patterns: ErrorPattern[];
  totalQuestions?: number;
  correctIds?: Set<number>;
}

/**
 * Fisher-Yates 洗牌算法
 */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 根据错因分布生成个性化练习套题
 * 
 * 组题策略（v4.0 集中突破模式）：
 * - 每个薄弱考点出 3~4 题（depending on difficulty & availability）
 * - 不再混合其他类型，专注突破薄弱环节
 * - 排除已正确题目
 * - 题目数量：薄弱类型数 × 3~4 题
 */
export function generatePersonalizedSet(config: PersonalizedConfig): QuestionSet {
  const { weakAreas, patterns, correctIds = new Set() } = config;

  // 获取练习题池
  const pool = practicePool.questions || [];

  // 按考点分组（v3.0：优先用 primaryCategory，兼容旧 targetErrorType）
  const byCategory: Record<string, Question[]> = {};
  pool.forEach(q => {
    const cat = q.primaryCategory || (q.targetErrorType ? q.targetErrorType.split('+')[0] : undefined);
    if (!cat) return;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(q);
  });

  // 排除已正确的题目
  Object.keys(byCategory).forEach(tag => {
    byCategory[tag] = byCategory[tag].filter(q => !correctIds.has(q.id));
  });

  // 按错误占比排序（最高优先）
  const weakPatternMap = new Map<string, number>();
  patterns
    .filter(p => weakAreas.includes(p.type))
    .forEach(p => weakPatternMap.set(p.type, p.percentage));

  const sortedWeakAreas = [...weakAreas].sort((a, b) => 
    (weakPatternMap.get(b) || 0) - (weakPatternMap.get(a) || 0)
  );

  const selected: Question[] = [];
  const usedIds = new Set<number>();

  // 每个薄弱考点出 3~4 题
  for (const area of sortedWeakAreas) {
    const candidates = shuffle(byCategory[area] || []).filter(q => !usedIds.has(q.id));
    
    // 根据难度和可用题目数决定数量
    // - 如果该考点难度普遍高（difficulty >= 3），出 3 题
    // - 如果题目充足（>= 4），出 4 题
    // - 否则尽可能多选
    const avgDifficulty = candidates.length > 0 
      ? candidates.reduce((sum, q) => sum + (q.difficulty || 2), 0) / candidates.length 
      : 2;
    const questionsPerArea = avgDifficulty >= 3 ? 3 : (candidates.length >= 4 ? 4 : candidates.length);
    
    const toPick = Math.min(questionsPerArea, candidates.length);
    
    for (let i = 0; i < toPick; i++) {
      selected.push(candidates[i]);
      usedIds.add(candidates[i].id);
    }
  }

  // 打乱最终题目顺序
  const shuffledSelected = shuffle(selected);

  // 生成套题名称
  const weakLabels = sortedWeakAreas.map(a => getCategoryLabel(a as any) || a);
  const setName = weakAreas.length > 0
    ? '针对性练习（' + weakLabels.join('、') + '）'
    : '巩固练习';

  return {
    id: `personalized-${Date.now()}`,
    name: setName,
    isFree: true,
    questions: shuffledSelected,
    questionCount: shuffledSelected.length,
    timeLimit: shuffledSelected.length * 42, // 每题 42 秒
  };
}

/**
 * 生成诊断测试题组（随机从题池抽取）
 * 
 * 策略：
 * - 从5个考点各随机抽4题 = 20题
 * - 难度分布：每考点优先选中等难度题
 * - 每次测试题目不同（从182题题池中随机）
 */
export function generateDiagnosticSet(): QuestionSet {
  const pool = practicePool.questions || [];
  const ALL_CATS: PrimaryCategory[] = ['从句逻辑', '词序排列', '修饰语位置', '谓语架构', '特殊句式'];
  
  // 按考点分组
  const byCategory: Record<string, Question[]> = {};
  pool.forEach(q => {
    const cat = q.primaryCategory || (q.targetErrorType ? q.targetErrorType.split('+')[0] : undefined);
    if (!cat) return;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(q);
  });
  
  const selected: Question[] = [];
  const usedIds = new Set<number>();
  
  // 每个考点选4题
  for (const cat of ALL_CATS) {
    const candidates = shuffle(byCategory[cat] || []).filter(q => !usedIds.has(q.id));
    // 优先选中等难度题（difficulty = 2），然后混合简单和难
    const sorted = candidates.sort((a, b) => {
      const diffA = Math.abs((a.difficulty || 2) - 2); // 越接近2越优先
      const diffB = Math.abs((b.difficulty || 2) - 2);
      return diffA - diffB;
    });
    
    const toPick = Math.min(4, sorted.length);
    for (let i = 0; i < toPick; i++) {
      selected.push(sorted[i]);
      usedIds.add(sorted[i].id);
    }
  }
  
  // 打乱顺序
  const shuffled = shuffle(selected);
  
  return {
    id: 'assessment-diagnostic',
    name: '能力诊断测试',
    isFree: true,
    questions: shuffled,
    questionCount: shuffled.length,
    timeLimit: shuffled.length * 42, // 每题42秒
  };
}

/**
 * 计算两套题结果的进步对比
 */
export function compareProgress(
  diagnostic: { correct: number; total: number; patterns: ErrorPattern[] },
  practice: { correct: number; total: number; patterns: ErrorPattern[] }
) {
  const diagRate = diagnostic.total > 0 ? (diagnostic.correct / diagnostic.total) * 100 : 0;
  const pracRate = practice.total > 0 ? (practice.correct / practice.total) * 100 : 0;

  // 计算各错误类型的改善
  const improvements: { type: string; before: number; after: number; change: number }[] = [];
  
  // 收集所有出现的 ErrorType / PrimaryCategory
  const allTypes = new Set<string>();
  diagnostic.patterns.forEach(p => allTypes.add(p.type));
  practice.patterns.forEach(p => allTypes.add(p.type));
  
  for (const type of allTypes) {
    const beforePattern = diagnostic.patterns.find(p => p.type === type);
    const afterPattern = practice.patterns.find(p => p.type === type);
    
    const before = beforePattern?.percentage || 0;
    const after = afterPattern?.percentage || 0;
    
    improvements.push({
      type,
      before,
      after,
      change: before - after, // 正值表示改善（错误占比下降）
    });
  }

  return {
    accuracyBefore: Math.round(diagRate),
    accuracyAfter: Math.round(pracRate),
    accuracyChange: Math.round(pracRate - diagRate),
    improvements,
    improved: pracRate > diagRate,
  };
}
