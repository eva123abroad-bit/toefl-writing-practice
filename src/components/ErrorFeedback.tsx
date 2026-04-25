import React from 'react';
import { AlertCircle, TrendingDown, Check, X, ChevronDown, ChevronUp, Target, BarChart3, Sparkles } from 'lucide-react';
import { cn } from './lib/utils';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import {
  OverallAnalysis,
  PrimaryCategory,
  getCategoryLabel,
  getCategoryColors,
  getCategoryTips,
} from '../utils/errorAnalysis';

interface ErrorFeedbackProps {
  analysis: OverallAnalysis;
  onStartTargetedPractice?: () => void;
  isDiagnostic?: boolean; // 是否来自诊断测试
  comparisonAnalysis?: OverallAnalysis | null; // 对比数据（个性化练习后的诊断数据）
}

export default function ErrorFeedback({ analysis, onStartTargetedPractice, isDiagnostic = false, comparisonAnalysis }: ErrorFeedbackProps) {
  const [expandedErrors, setExpandedErrors] = React.useState<Set<number>>(new Set());
  const [showTips, setShowTips] = React.useState<Set<string>>(new Set());

  const toggleError = (idx: number) => {
    setExpandedErrors(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const toggleTips = (type: string) => {
    setShowTips(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type); else next.add(type);
      return next;
    });
  };

  if (analysis.totalErrors === 0) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Check size={32} />
        </div>
        <h3 className="text-xl font-black text-green-800 mb-2">全部正确！</h3>
        <p className="text-green-600">太棒了！本次练习没有错误。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 错因模式总览 */}
      <div className="bg-gradient-to-br from-slate-50 to-white border border-gray-200 rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
            <TrendingDown size={22} />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">错因分析</h3>
            <p className="text-xs text-gray-400">
              共 {analysis.totalErrors} 道错题 / {analysis.totalQuestions} 题 (正确率 {analysis.accuracyRate}%)
            </p>
          </div>
        </div>

        {/* 错误类型分布 - 带可视化柱状图 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {analysis.patterns.map((pattern) => {
            const colors = getCategoryColors(pattern.type as PrimaryCategory);
            const isWeak = analysis.weakAreas.includes(pattern.type);
            return (
              <div
                key={pattern.type}
                className={cn("rounded-2xl p-4 border cursor-pointer transition-all hover:shadow-md relative", colors.bg, colors.border)}
                onClick={() => toggleTips(pattern.type)}
              >
                {isWeak && (
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center">
                    <AlertCircle size={10} />
                  </div>
                )}
                <p className={cn("text-xs font-bold uppercase tracking-wider", colors.text)}>{getCategoryLabel(pattern.type as PrimaryCategory)}</p>
                <p className={cn("text-2xl font-black mt-1", colors.text)}>{pattern.count}</p>
                <p className="text-xs text-gray-500 mb-2">{pattern.percentage}% of errors</p>
                {/* 迷你柱状图 */}
                <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500", isWeak ? "bg-orange-400" : colors.text.replace('text-', 'bg-'))}
                    style={{ width: `${Math.min(pattern.percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 诊断/对比模式：雷达图 + 错因画像总览 */}
        {(isDiagnostic || comparisonAnalysis) && analysis.patterns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 雷达图 */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target size={16} className="text-teal-500" />
                <span className="text-sm font-bold text-slate-700">
                  {comparisonAnalysis ? '进步对比雷达图' : '能力雷达图'}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={(() => {
                  const ALL_CATS = ['从句逻辑', '词序排列', '修饰语位置', '谓语架构', '特殊句式'];
                  const maxErrors = comparisonAnalysis 
                    ? Math.max(comparisonAnalysis.totalErrors || 1, analysis.totalErrors || 1)
                    : (analysis.totalErrors || 1);
                  return ALL_CATS.map(cat => {
                    const current = analysis.patterns.find(p => p.type === cat);
                    const baseline = comparisonAnalysis?.patterns.find(p => p.type === cat);
                    return {
                      category: cat,
                      本次: current?.count || 0,
                      诊断: baseline?.count || 0,
                      fullMark: maxErrors,
                    };
                  });
                })()}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 'auto']}
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                    tickCount={4}
                  />
                  {comparisonAnalysis && (
                    <Radar
                      name="诊断错误"
                      dataKey="诊断"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  )}
                  <Radar
                    name="本次错误"
                    dataKey="本次"
                    stroke="#0d9488"
                    fill="#0d9488"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
              {comparisonAnalysis && (
                <div className="flex items-center justify-center gap-4 mt-2">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="w-3 h-3 rounded-full bg-orange-500 opacity-50"></span>诊断
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="w-3 h-3 rounded-full bg-teal-600 opacity-50"></span>本次
                  </span>
                </div>
              )}
            </div>

            {/* 错因画像 */}
            <div className="bg-gradient-to-r from-slate-100 to-white border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={16} className="text-slate-500" />
                <span className="text-sm font-bold text-slate-700">错因占比</span>
              </div>
              <div className="space-y-2">
                {analysis.patterns.map((pattern) => {
                  const colors = getCategoryColors(pattern.type as PrimaryCategory);
                  const isWeak = analysis.weakAreas.includes(pattern.type);
                  return (
                    <div key={pattern.type} className="flex items-center gap-3">
                      <span className={cn("text-xs font-bold w-20 text-right", colors.text)}>
                        {getCategoryLabel(pattern.type as PrimaryCategory)}
                      </span>
                      <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2", isWeak ? "bg-orange-400" : colors.text.replace('text-', 'bg-'))}
                          style={{ width: `${Math.max(pattern.percentage, 8)}%` }}
                        >
                          <span className="text-[10px] font-bold text-white">{pattern.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 薄弱环节提示 */}
        {analysis.weakAreas.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-amber-600" />
              <span className="text-sm font-bold text-amber-800">薄弱环节</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.weakAreas.map(type => (
                <span key={type} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                  {getCategoryLabel(type as PrimaryCategory)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 提升建议（可展开） */}
        {analysis.patterns.map(pattern => (
          <div key={pattern.type} className="mb-3">
            {showTips.has(pattern.type) && (
              <div className={cn("rounded-2xl p-4 border", getCategoryColors(pattern.type as PrimaryCategory).bg, getCategoryColors(pattern.type as PrimaryCategory).border)}>
                <div className="flex items-center justify-between mb-3">
                  <span className={cn("text-sm font-bold", getCategoryColors(pattern.type as PrimaryCategory).text)}>
                    {getCategoryLabel(pattern.type as PrimaryCategory)} — 提升建议
                  </span>
                  <button onClick={() => toggleTips(pattern.type)} className="text-gray-400 hover:text-gray-600">
                    <ChevronUp size={16} />
                  </button>
                </div>
                <ul className="space-y-2">
                  {getCategoryTips(pattern.type as PrimaryCategory).map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-xs font-bold text-gray-400 mt-0.5">{i + 1}.</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* 针对练习按钮 */}
        {onStartTargetedPractice && analysis.weakAreas.length > 0 && (
          <div className="mt-4">
            {isDiagnostic && (
              <p className="text-sm text-gray-600 mb-3 text-center">
                基于你的错因分析，我们为你推荐 <span className="font-bold text-teal-600">针对性练习套题</span>
              </p>
            )}
            <button
              onClick={onStartTargetedPractice}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl font-black text-lg hover:from-teal-600 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-3"
            >
              <Sparkles size={22} />
              {isDiagnostic ? '开始个性化练习' : '针对薄弱环节 — 开始 10 道提升练习'}
            </button>
          </div>
        )}
      </div>

      {/* 逐题错因反馈 */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-1">逐题错因分析</h4>
        {analysis.errors
          .filter(e => !e.isCorrect)
          .map((error) => {
            const catColors = error.category ? getCategoryColors(error.category) : (error.errorType ? getCategoryColors(error.errorType as PrimaryCategory) : null);
            // 标签文字：优先 keyPoints[0]（最具体），再 primaryCategory，再旧 errorType
            const tagLabel = error.keyPoints?.[0] || (error.category ? getCategoryLabel(error.category) : (error.errorType ? getCategoryLabel(error.errorType as PrimaryCategory) : ''));
            const isExpanded = expandedErrors.has(error.questionIndex);
            return (
              <div
                key={error.questionIndex}
                className={cn(
                  "rounded-2xl border-2 overflow-hidden transition-all",
                  catColors ? `${catColors.bg} ${catColors.border}` : "bg-gray-50 border-gray-200"
                )}
              >
                <div
                  className="p-4 cursor-pointer flex items-center justify-between"
                  onClick={() => toggleError(error.questionIndex)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400">Q{error.questionIndex + 1}</span>
                    {tagLabel && (
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold", catColors?.light, catColors?.text)}>
                        {tagLabel}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <X size={14} className="text-red-400" />
                    {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    {error.keyPoints && error.keyPoints.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {error.keyPoints.map((kp, ki) => (
                          <span key={ki} className={cn("px-2 py-0.5 rounded-full text-[11px] font-bold", catColors?.light, catColors?.text)}>
                            {kp}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className={cn("text-sm", catColors?.text)}>
                      {error.analysis}
                    </p>
                    {(error.ruleHint || error.hint) && (
                      <div className="bg-white/70 rounded-xl p-3 border border-dashed border-gray-300">
                        <div className="flex items-start gap-2">
                          <span className="text-base">💡</span>
                          <div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">规则提示</span>
                            <p className="text-sm text-gray-700 mt-1">{error.hint || error.ruleHint}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-400 font-bold mr-2">你的答案：</span>
                        <span className="text-red-600">{error.userAnswer.filter(w => w).join(' ')}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-400 font-bold mr-2">正确答案：</span>
                        <span className="text-teal-700 font-bold">{error.correctAnswer.join(' ')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
