/**
 * BSA 错因分析引擎 v3.0
 * 基于 primaryCategory 主分类体系
 */
import { PrimaryCategory, ErrorType } from '../types';
export type { PrimaryCategory, ErrorType };

// ===== 旧版兼容（seedQuestions 使用） =====
export const A_LABELS: Record<string, string> = {
  A1: '特殊疑问句倒装', A2: '一般疑问句倒装', A3: '间接疑问句/宾语从句',
  A4: '定语从句', A5: '状语从句', A6: '存在句型', A7: '否定句',
};
export const B_LABELS: Record<string, string> = {
  B1: '时态词形', B2: 'be动词形式', B3: '情态动词', B4: '否定词选择', B5: '冠词/单复数',
};
export function parseTag(tag: ErrorType): { a: string; b: string[] } {
  const parts = tag.split('+'); return { a: parts[0], b: parts.slice(1) };
}
export function getTagLabel(tag: ErrorType): string {
  const { a, b } = parseTag(tag);
  const aLabel = A_LABELS[a] || a;
  if (b.length === 0) return aLabel;
  const bLabels = b.map(p => B_LABELS[p] || p);
  return aLabel + ' + ' + bLabels.join(' + ');
}
const A_COLORS: Record<string, { bg: string; text: string; border: string; light: string }> = {
  A1: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300', light: 'bg-amber-100' },
  A2: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-300', light: 'bg-yellow-100' },
  A3: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300', light: 'bg-blue-100' },
  A4: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300', light: 'bg-purple-100' },
  A5: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300', light: 'bg-green-100' },
  A6: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-300', light: 'bg-cyan-100' },
  A7: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-300', light: 'bg-rose-100' },
};
const DEFAULT_COLOR = { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-300', light: 'bg-gray-100' };
export function getTagColors(tag: ErrorType) { const { a } = parseTag(tag); return A_COLORS[a] || DEFAULT_COLOR; }
const A_TIPS: Record<string, string[]> = {
  A1: ['特殊疑问句中，疑问词+助动词/情态动词+主语+动词', '疑问词在句首，主语和助动词需要倒装'],
  A2: ['一般疑问句需要把助动词/be动词/情态动词提到主语前面', '回答用 Yes/No 开头，语序恢复陈述句语序'],
  A3: ['间接疑问句/宾语从句中，疑问词后用陈述语序，不要倒装', '注意区分直接疑问句（倒装）和间接疑问句（不倒装）'],
  A4: ['定语从句中，关系代词（who/which/that）引导修饰名词的从句', '注意限制性vs非限制性定语从句'],
  A5: ['状语从句由连词（because/although/if/when 等）引导', '状语从句位置灵活'],
  A6: ['存在句型用 There is/are... 结构', 'There is 接单数/不可数，There are 接复数'],
  A7: ['否定句中，not 放在助动词/be动词/情态动词之后', '区分 don\'t/doesn\'t/didn\'t 与主语人称搭配'],
};
const B_TIPS: Record<string, string[]> = {
  B1: ['注意对话中的时间线索', '现在完成时 vs 过去时：看是否有持续影响'],
  B2: ['be动词有三种形式：am/is/are，需与主语搭配', '过去式统一为 was/were'],
  B3: ['情态动词后接动词原形', '情态动词没有人称变化'],
  B4: ['否定词选择：not vs no vs never vs neither', 'not 修饰动词，no 修饰名词'],
  B5: ['冠词 a/an/the 的选择：泛指用 a/an，特指用 the', '可数名词复数不加冠词（泛指时）'],
};
export function getTagTips(tag: ErrorType): string[] {
  const { a, b } = parseTag(tag); const tips = [...(A_TIPS[a] || [])];
  b.forEach(bp => { tips.push(...(B_TIPS[bp] || [])); }); return tips;
}

// ===== 新版：primaryCategory 驱动 =====
export const CATEGORY_CONFIG: Record<PrimaryCategory, {
  label: string; description: string;
  colors: { bg: string; text: string; border: string; light: string };
  tips: string[]; icon: string;
}> = {
  '从句逻辑': {
    label: '从句逻辑', description: '宾语从句、定语从句、状语从句的引导词和语序',
    colors: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300', light: 'bg-blue-100' },
    tips: ['间接疑问句/宾语从句中，疑问词后用陈述语序，不要倒装', '定语从句中，关系代词引导修饰名词的从句', '状语从句由连词引导', '注意区分直接疑问句（倒装）和间接疑问句（不倒装）'], icon: '🔗',
  },
  '词序排列': {
    label: '词序排列', description: '疑问句倒装、主谓宾排列、多词位置',
    colors: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300', light: 'bg-amber-100' },
    tips: ['特殊疑问句中，疑问词+助动词/情态动词+主语+动词', '一般疑问句需要把助动词/be动词/情态动词提到主语前面', '注意区分陈述语序和疑问语序的差异'], icon: '📊',
  },
  '修饰语位置': {
    label: '修饰语位置', description: '副词、形容词、介词短语的位置',
    colors: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300', light: 'bg-purple-100' },
    tips: ['频度副词放在 be 动词后、实义动词前', '程度副词放在形容词或副词前', '时间/地点状语通常放在句末'], icon: '📍',
  },
  '谓语架构': {
    label: '谓语架构', description: '时态、语态、主谓一致、否定结构',
    colors: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300', light: 'bg-green-100' },
    tips: ['注意对话中的时间线索', '现在完成时 vs 过去时：看是否有持续影响', 'be动词需与主语搭配', '情态动词后接动词原形', '否定句中 not 放在助动词/be动词/情态动词之后'], icon: '⚙️',
  },
  '特殊句式': {
    label: '特殊句式', description: '存在句型、There be、倒装、省略',
    colors: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-300', light: 'bg-rose-100' },
    tips: ['存在句型用 There is/are... 结构', 'There is 接单数/不可数名词，There are 接复数名词', '注意 There be 句型中的主谓一致', '冠词 a/an/the 的选择：泛指用 a/an，特指用 the'], icon: '✨',
  },
};
export function getCategoryLabel(cat: PrimaryCategory): string { return CATEGORY_CONFIG[cat]?.label || cat; }
export function getCategoryColors(cat: PrimaryCategory) { return CATEGORY_CONFIG[cat]?.colors || DEFAULT_COLOR; }
export function getCategoryTips(cat: PrimaryCategory): string[] { return CATEGORY_CONFIG[cat]?.tips || []; }

// ===== Proxy 兼容层 =====
export const ERROR_TYPE_LABELS = new Proxy({} as Record<string, string>, {
  get(_, prop: string) {
    if (typeof prop !== 'string') return '';
    if (CATEGORY_CONFIG[prop as PrimaryCategory]) return CATEGORY_CONFIG[prop as PrimaryCategory].label;
    return getTagLabel(prop as ErrorType);
  },
});
export const ERROR_TYPE_COLORS = new Proxy({} as Record<string, typeof DEFAULT_COLOR>, {
  get(_, prop: string) {
    if (typeof prop !== 'string') return DEFAULT_COLOR;
    if (CATEGORY_CONFIG[prop as PrimaryCategory]) return CATEGORY_CONFIG[prop as PrimaryCategory].colors;
    const { a } = parseTag(prop as ErrorType);
    return A_COLORS[a] || DEFAULT_COLOR;
  },
});
export const ERROR_TYPE_TIPS = new Proxy({} as Record<string, string[]>, {
  get(_, prop: string) {
    if (typeof prop !== 'string') return [];
    if (CATEGORY_CONFIG[prop as PrimaryCategory]) return CATEGORY_CONFIG[prop as PrimaryCategory].tips;
    return getTagTips(prop as ErrorType);
  },
});

// ===== 分析接口 =====
export interface ErrorAnalysis {
  questionIndex: number; isCorrect: boolean;
  category?: PrimaryCategory; errorType?: ErrorType;
  keyPoints?: string[]; difficulty?: number;
  userAnswer: string[]; correctAnswer: string[];
  template?: string; // 句子模板，用于生成完整句子
  analysis: string; hint?: string; ruleHint?: string;
}

/** 将 template + words 合成完整句子 */
export function fillTemplate(template: string | undefined, words: string[]): string {
  if (!template) return words.join(' ');
  return template.replace(/\{(\d+)\}/g, (_, idx) => words[parseInt(idx)] || '___');
}
export interface ErrorPattern {
  type: string; count: number; percentage: number; questionIndices: number[];
}
export interface OverallAnalysis {
  errors: ErrorAnalysis[]; patterns: ErrorPattern[];
  weakAreas: string[]; totalErrors: number;
  totalQuestions: number; accuracyRate: number;
}

/** 检测两词是否为同一词的不同时态/形态变体 */
function isTenseVariant(w1: string, w2: string): boolean {
  const a = w1.toLowerCase().replace(/[^a-z]/g, '');
  const b = w2.toLowerCase().replace(/[^a-z]/g, '');
  if (a === b || a.length < 3 || b.length < 3) return false;
  const pairs: Record<string, string[]> = {
    go:['went','gone','goes','going'], went:['go','gone','goes'], gone:['go','went','goes'],
    come:['came','comes','coming'], came:['come','comes','coming'],
    take:['took','taken','takes'], took:['take','taken','takes'], taken:['take','took','takes'],
    give:['gave','given','gives'], gave:['give','given','gives'], given:['give','gave','gives'],
    make:['made','makes','making'], made:['make','makes','making'],
    do:['did','done','does','doing'], did:['do','done','does'], done:['do','did','does'],
    have:['had','has','having'], had:['have','has'], has:['have','had'],
    say:['said','says','saying'], said:['say','says'],
    tell:['told','tells','telling'], told:['tell','tells'],
    get:['got','gets','getting'], got:['get','gets'],
    know:['knew','known','knows'], knew:['know','known'], known:['know','knew'],
    think:['thought','thinks'], thought:['think','thinks'],
    see:['saw','seen','sees'], saw:['see','seen'], seen:['see','saw'],
    write:['wrote','written','writes'], wrote:['write','written'], written:['write','wrote'],
    send:['sent','sends','sending'], sent:['send','sends'],
    spend:['spent','spends'], spent:['spend','spends'],
    meet:['met','meets'], met:['meet','meets'],
    find:['found','finds'], found:['find','finds'],
    buy:['bought','buys'], bought:['buy','buys'],
    pay:['paid','pays'], paid:['pay','pays'],
    speak:['spoke','spoken','speaks'], spoke:['speak','spoken'], spoken:['speak','spoke'],
    eat:['ate','eaten','eats'], ate:['eat','eaten'], eaten:['eat','ate'],
    drink:['drank','drunk','drinks'], drank:['drink','drunk'], drunk:['drink','drank'],
    drive:['drove','driven','drives'], drove:['drive','driven'], driven:['drive','drove'],
    teach:['taught','teaches'], taught:['teach','teaches'],
    begin:['began','begun','begins'], began:['begin','begun'], begun:['begin','began'],
    leave:['left','leaves'], left:['leave','leaves'],
    feel:['felt','feels'], felt:['feel','feels'],
    keep:['kept','keeps'], kept:['keep','keeps'],
    build:['built','builds'], built:['build','builds'],
    hold:['held','holds'], held:['hold','holds'],
    mean:['meant','means'], meant:['mean','means'],
    sit:['sat','sits'], sat:['sit','sits'],
    stand:['stood','stands'], stood:['stand','stands'],
    lose:['lost','loses'], lost:['lose','loses'],
    choose:['chose','chosen','chooses'], chose:['choose','chosen'], chosen:['choose','chose'],
  };
  if (pairs[a]?.includes(b) || pairs[b]?.includes(a)) return true;
  const stems = [[a, b], [b, a]];
  for (const [base, variant] of stems) {
    if (variant.endsWith('ed') && (base === variant.slice(0, -2) || base === variant.slice(0, -1))) return true;
    if (variant.endsWith('ied') && base + 'y' === variant.slice(0, -3) + 'y') return true;
    if (variant.endsWith('es') && base === variant.slice(0, -2)) return true;
    if (variant.endsWith('s') && base === variant.slice(0, -1)) return true;
    if (variant.endsWith('ing') && (base === variant.slice(0, -3) || base === variant.slice(0, -3) + 'e')) return true;
  }
  return false;
}

/** 判断词是否为干扰词 */
function isDistractor(word: string, allWords: string[], correctSentence: string[]): boolean {
  const clean = (w: string) => w.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  const cw = clean(word);
  return !correctSentence.some(c => clean(c) === cw) && allWords.some(a => clean(a) === cw);
}

/** 生成分析文本 */
function buildAnalysisText(details: { emptySlots: number; distractorUsed: number; wrongOrder: number; tenseError: number }): string {
  const parts: string[] = [];
  if (details.emptySlots > 0) parts.push('有 ' + details.emptySlots + ' 个空格未填写');
  if (details.distractorUsed > 0) parts.push('选用了 ' + details.distractorUsed + ' 个干扰词');
  if (details.tenseError > 0) parts.push('有 ' + details.tenseError + ' 处词形/时态选择有误');
  if (details.wrongOrder > 0) parts.push('有 ' + details.wrongOrder + ' 处词序不正确');
  return parts.length > 0 ? parts.join('，') + '。' : '';
}

/** 分析单道错题 — 优先使用新标签 primaryCategory，兼容旧标签 targetErrorType */
export function analyzeSingleError(
  userAnswer: string[], correctAnswer: string[], allWords: string[],
  primaryCategory?: PrimaryCategory, keyPoints?: string[], difficulty?: number, hint?: string,
  targetErrorType?: ErrorType, ruleHint?: string, errorPredictions?: { wrongWord: string; replaces: string; errorType: string; hint: string }[]
): ErrorAnalysis {
  const clean = (w: string) => w.replace(/[()]/g, '').trim();
  const cUser = userAnswer.map(w => clean(w || ''));
  const cCorrect = correctAnswer.map(w => clean(w || ''));
  const len = Math.max(cUser.length, cCorrect.length);
  let emptySlots = 0, distractorUsed = 0, tenseError = 0, wrongOrder = 0;
  
  // 匹配 errorPredictions
  let matchedPrediction: { wrongWord: string; replaces: string; errorType: string; hint: string } | null = null;
  if (errorPredictions && errorPredictions.length > 0) {
    for (let i = 0; i < len; i++) {
      const uw = cUser[i] || '', cw = cCorrect[i] || '';
      if (uw && cw && uw !== cw) {
        const pred = errorPredictions.find(p => 
          (p.wrongWord === uw && p.replaces === cw) || 
          (p.wrongWord.toLowerCase() === uw.toLowerCase() && p.replaces.toLowerCase() === cw.toLowerCase())
        );
        if (pred) { matchedPrediction = pred; break; }
      }
    }
  }
  
  for (let i = 0; i < len; i++) {
    const uw = cUser[i] || '', cw = cCorrect[i] || '';
    if (!uw && cw) { emptySlots++; continue; }
    if (uw !== cw) {
      if (isDistractor(uw, allWords, cCorrect)) { distractorUsed++; continue; }
      if (isTenseVariant(uw, cw)) { tenseError++; continue; }
      wrongOrder++;
    }
  }
  const analysis = buildAnalysisText({ emptySlots, distractorUsed, wrongOrder, tenseError });
  
  // 优先使用 matchedPrediction 的 hint
  const finalHint = matchedPrediction?.hint || hint;
  const finalCategory = (matchedPrediction?.errorType as PrimaryCategory) || primaryCategory;
  
  return {
    questionIndex: 0, isCorrect: false,
    category: finalCategory, errorType: targetErrorType,
    keyPoints, difficulty,
    userAnswer, correctAnswer, analysis, hint: finalHint, ruleHint
  };
}

/** 分析整套题的错因模式 */
export function analyzeQuizResults(
  results: { isCorrect: boolean; userAnswer: string[]; correctAnswer: string[] }[],
  questions: { words: string[]; template?: string; primaryCategory?: PrimaryCategory; keyPoints?: string[]; difficulty?: number; hint?: string; targetErrorType?: ErrorType; ruleHint?: string; errorPredictions?: { wrongWord: string; replaces: string; errorType: string; hint: string }[] }[]
): OverallAnalysis {
  const errors: ErrorAnalysis[] = [];
  const typeCount: Record<string, number> = {};
  let totalErrors = 0;
  results.forEach((result, idx) => {
    if (result.isCorrect) {
      errors.push({ questionIndex: idx, isCorrect: true, userAnswer: result.userAnswer, correctAnswer: result.correctAnswer, template: questions[idx]?.template, analysis: '' });
    } else {
      totalErrors++;
      const q = questions[idx] || {};
      const analysis = analyzeSingleError(
        result.userAnswer, result.correctAnswer, q.words || [],
        q.primaryCategory, q.keyPoints, q.difficulty, q.hint,
        q.targetErrorType, q.ruleHint, q.errorPredictions
      );
      analysis.questionIndex = idx;
      analysis.template = q.template;
      // 统计类型：优先用新分类
      const type = analysis.category || q.primaryCategory || q.targetErrorType || 'A3';
      typeCount[type] = (typeCount[type] || 0) + 1;
      errors.push(analysis);
    }
  });
  const patterns: ErrorPattern[] = (Object.entries(typeCount) as [string, number][])
    .filter(([, c]) => c > 0)
    .map(([type, count]) => ({
      type, count,
      percentage: totalErrors > 0 ? Math.round((count / totalErrors) * 100) : 0,
      questionIndices: errors.filter(e => !e.isCorrect && (e.category || e.errorType) === type).map(e => e.questionIndex),
    }))
    .sort((a, b) => b.count - a.count);
  const weakAreas = patterns.filter(p => p.percentage >= 20).map(p => p.type);
  const correctCount = results.filter(r => r.isCorrect).length;
  return {
    errors, patterns, weakAreas, totalErrors,
    totalQuestions: results.length,
    accuracyRate: results.length > 0 ? Math.round((correctCount / results.length) * 100) : 100,
  };
}
