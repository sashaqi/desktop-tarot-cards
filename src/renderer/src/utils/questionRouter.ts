import { CategoryId } from '../types/spread'

/**
 * Routes a free-text question to whichever themed tone fits best, so a custom
 * question still reads as though the deck understood the topic. This is plain
 * keyword matching, not comprehension — anything it can't place falls back to
 * the neutral 'general' tone.
 */
export type RoutedTone = Exclude<CategoryId, 'custom'>

const keywords: Record<RoutedTone, string[]> = {
  love: [
    // zh
    '爱', '恋', '喜欢', '感情', '暧昧', '表白', '告白', '分手', '复合', '男友', '女友',
    '男朋友', '女朋友', '对象', '伴侣', '老公', '老婆', '结婚', '婚姻', '相亲', '追',
    '前任', '暗恋', '约会', '吵架', '异地',
    // en
    'love', 'romance', 'romantic', 'relationship', 'dating', 'date', 'crush',
    'partner', 'boyfriend', 'girlfriend', 'husband', 'wife', 'marriage', 'marry',
    'breakup', 'break up', 'ex ', 'divorce', 'flirt', 'soulmate'
  ],
  career: [
    // zh
    '工作', '事业', '职业', '职场', '上班', '公司', '老板', '同事', '面试', '跳槽',
    '升职', '加薪', '辞职', '离职', '创业', '项目', '考试', '考研', '学业', '毕业',
    '论文', '实习', '转行', '裁员',
    // en
    'career', 'job', 'work', 'boss', 'manager', 'colleague', 'coworker',
    'interview', 'promotion', 'raise', 'resign', 'quit', 'startup', 'business',
    'project', 'exam', 'study', 'school', 'degree', 'internship', 'layoff', 'hire'
  ],
  wealth: [
    // zh
    '钱', '财', '财运', '收入', '工资', '薪水', '投资', '理财', '股票', '基金',
    '买房', '房贷', '债', '欠款', '存款', '生意', '亏', '赚', '收益', '预算',
    // en
    'money', 'wealth', 'finance', 'financial', 'income', 'salary', 'invest',
    'investment', 'stock', 'fund', 'crypto', 'savings', 'debt', 'loan',
    'mortgage', 'budget', 'profit', 'afford', 'buy a house'
  ],
  general: []
}

export function routeQuestion(question: string): RoutedTone {
  const text = question.toLowerCase()

  let best: RoutedTone = 'general'
  let bestScore = 0

  for (const tone of ['love', 'career', 'wealth'] as const) {
    const score = keywords[tone].reduce((n, kw) => (text.includes(kw) ? n + 1 : n), 0)
    if (score > bestScore) {
      bestScore = score
      best = tone
    }
  }

  return best
}
