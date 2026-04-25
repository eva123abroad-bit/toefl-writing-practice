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
  wrongKeyPoints?: string[][];    // 错题的 keyPoints 列表，用于精准匹配
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
 * 组题策略（v5.0 keyPoints精准匹配）：
 * - 先按 keyPoints 重叠度精准匹配，重叠度高的优先
 * - keyPoints 匹配不够时，按 primaryCategory 兜底
 * - 排除已正确题目
 * - 题目数量：薄弱类型数 × 3~4 题
 */
export function generatePersonalizedSet(config: PersonalizedConfig): QuestionSet {
  const { weakAreas, patterns, correctIds = new Set(), wrongKeyPoints = [] } = config;

  // 获取练习题池
  const pool = practicePool.questions || [];

  // 收集错题中出现的所有 keyPoint（扁平化）
  const wrongKPSet = new Set<string>();
  wrongKeyPoints.forEach(kps => kps.forEach(kp => wrongKPSet.add(kp)));
  const wrongKPArray = [...wrongKPSet];

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

  /**
   * 计算一道题与错题 keyPoints 的重叠度
   * 返回重叠的 keyPoint 数量
   */
  function keyPointOverlap(q: Question): number {
    if (!q.keyPoints || q.keyPoints.length === 0 || wrongKPArray.length === 0) return 0;
    return q.keyPoints.filter(kp => wrongKPSet.has(kp)).length;
  }

  const selected: Question[] = [];
  const usedIds = new Set<number>();

  // 每个薄弱考点出 3~4 题
  for (const area of sortedWeakAreas) {
    const allCandidates = (byCategory[area] || []).filter(q => !usedIds.has(q.id));
    
    // 按 keyPoints 重叠度排序（高的优先），重叠度为0的排后面
    const sorted = [...allCandidates].sort((a, b) => {
      const overlapA = keyPointOverlap(a);
      const overlapB = keyPointOverlap(b);
      if (overlapA !== overlapB) return overlapB - overlapA; // 重叠多的优先
      // 同重叠度：中等难度优先
      const diffA = Math.abs((a.difficulty || 2) - 2);
      const diffB = Math.abs((b.difficulty || 2) - 2);
      return diffA - diffB;
    });

    // 根据难度和可用题目数决定数量
    const avgDifficulty = sorted.length > 0 
      ? sorted.reduce((sum, q) => sum + (q.difficulty || 2), 0) / sorted.length 
      : 2;
    const questionsPerArea = avgDifficulty >= 3 ? 3 : (sorted.length >= 4 ? 4 : sorted.length);
    
    const toPick = Math.min(questionsPerArea, sorted.length);
    
    for (let i = 0; i < toPick; i++) {
      selected.push(sorted[i]);
      usedIds.add(sorted[i].id);
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
 * - 排除已做过的题目（excludeIds）
 * - 如果某考点排除后不够4题，用已做题目兜底
 */
export function generateDiagnosticSet(excludeIds?: Set<number>): QuestionSet {
  const pool = practicePool.questions || [];
  const ALL_CATS: PrimaryCategory[] = ['从句逻辑', '词序排列', '修饰语位置', '谓语架构', '特殊句式'];
  const excluded = excludeIds || new Set<number>();
  
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
  
  // 每个考点选4题（优先排除已做题目）
  for (const cat of ALL_CATS) {
    const candidates = shuffle(byCategory[cat] || []);
    // 优先选没做过的题
    const fresh = candidates.filter(q => !usedIds.has(q.id) && !excluded.has(q.id));
    // 已做过的题作为兜底
    const used = candidates.filter(q => !usedIds.has(q.id) && excluded.has(q.id));
    
    // 先从 fresh 中按难度排序选取
    const sortedFresh = [...fresh].sort((a, b) => {
      const diffA = Math.abs((a.difficulty || 2) - 2);
      const diffB = Math.abs((b.difficulty || 2) - 2);
      return diffA - diffB;
    });
    
    const sortedUsed = [...used].sort((a, b) => {
      const diffA = Math.abs((a.difficulty || 2) - 2);
      const diffB = Math.abs((b.difficulty || 2) - 2);
      return diffA - diffB;
    });
    
    // 先取 fresh，不够再用 used 兜底
    const merged = [...sortedFresh, ...sortedUsed];
    const toPick = Math.min(4, merged.length);
    for (let i = 0; i < toPick; i++) {
      selected.push(merged[i]);
      usedIds.add(merged[i].id);
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
