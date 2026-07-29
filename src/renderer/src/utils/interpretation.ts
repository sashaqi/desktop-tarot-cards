import { DrawnCard } from '../types/reading'
import { CategoryId } from '../types/spread'
import { Language } from '../types/card'
import { routeQuestion, RoutedTone } from './questionRouter'
import { analyseSpread, describeSignals } from './spreadAnalysis'
import { buildClosing } from './closingRead'

const openers: Record<RoutedTone, Record<Language, string>> = {
  love: { zh: '关于这段感情，三张牌是这样说的：', en: "Here's what the three cards say about this relationship:" },
  career: { zh: '关于这份事业，三张牌是这样说的：', en: "Here's what the three cards say about your career:" },
  wealth: { zh: '关于近期的财运，三张牌是这样说的：', en: "Here's what the three cards say about your finances:" },
  general: { zh: '关于你问的这件事，三张牌是这样说的：', en: "Here's what the three cards say about what you asked:" }
}

export function buildSummary(
  categoryId: CategoryId,
  draws: DrawnCard[],
  lang: Language,
  question?: string
): string {
  // A custom question borrows the tone of whichever theme its wording is
  // closest to, so the summary at least sounds like it's on topic.
  const tone: RoutedTone = categoryId === 'custom' ? routeQuestion(question ?? '') : categoryId

  const orientationLabel = { zh: { upright: '正位', reversed: '逆位' }, en: { upright: 'upright', reversed: 'reversed' } }

  const signals = analyseSpread(draws)
  const overview = describeSignals(signals, draws.length, lang)

  const lines = draws.map((d) => {
    const kw = d.card.keywords[d.orientation][lang][0]
    const posLabel = lang === 'zh' ? d.position.labelLocalized : d.position.label
    const cardName = lang === 'zh' ? d.card.nameLocalized : d.card.name
    const orientation = orientationLabel[lang][d.orientation]
    return lang === 'zh'
      ? `「${posLabel}」是${orientation}的${cardName}，指向${kw}。`
      : `"${posLabel}" is the ${cardName} (${orientation}), pointing to ${kw}.`
  })

  return [overview, openers[tone][lang], ...lines, buildClosing(draws, lang)]
    .filter(Boolean)
    .join(' ')
}
