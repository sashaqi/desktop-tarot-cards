import { DrawnCard } from '../types/reading'
import { CategoryId } from '../types/spread'
import { Language } from '../types/card'
import { routeQuestion, RoutedTone } from './questionRouter'
import { analyseSpread, describeSignals } from './spreadAnalysis'
import { buildClosing } from './closingRead'

const topics: Record<RoutedTone, Record<Language, string>> = {
  love: { zh: '关于这段感情', en: 'On this relationship' },
  career: { zh: '关于这份事业', en: 'On your work' },
  wealth: { zh: '关于近期的财运', en: 'On your finances' },
  general: { zh: '关于你问的这件事', en: 'On what you asked' }
}

/**
 * The three spreads differ in what their positions mean to each other, so the
 * connecting line has to differ too: past/present/future is a trajectory,
 * self/other/relationship is a triangle, and the advice-style spreads state a
 * problem whose answer is the third card.
 */
type Shape = 'temporal' | 'relational' | 'directive'

function spreadShape(draws: DrawnCard[]): Shape {
  const ids = draws.map((d) => d.position.id)
  if (ids.includes('relationship')) return 'relational'
  if (ids.includes('future')) return 'temporal'
  return 'directive'
}

/**
 * Connects the cards into one statement instead of listing them.
 *
 * Deliberately uses keywords rather than card names: the panel above already
 * shows each card in full, and naming the third card here as well as in the
 * closing made it read as though the reading repeated itself.
 *
 * The directive shape stops at the second card on purpose — its third position
 * *is* the answer, so it belongs to the closing alone.
 */
function connectingLine(draws: DrawnCard[], shape: Shape, topic: string, lang: Language): string {
  const kw = draws.map((d) => d.card.keywords[d.orientation][lang][0])

  if (lang === 'zh') {
    switch (shape) {
      case 'temporal':
        return `${topic}：${kw[0]}把你带到今天，眼下停在${kw[1]}，而这条线正朝着${kw[2]}去。`
      case 'relational':
        return `${topic}：你这边是${kw[0]}，对方那边是${kw[1]}，而你们之间显出来的是${kw[2]}。`
      case 'directive':
        return `${topic}：局面眼下停在${kw[0]}，真正卡住它的是${kw[1]}。`
    }
  }

  switch (shape) {
    case 'temporal':
      return `${topic}: ${kw[0]} is what brought you here, ${kw[1]} is where you stand, and the line runs toward ${kw[2]}.`
    case 'relational':
      return `${topic}: ${kw[0]} on your side, ${kw[1]} on theirs, and what shows up between you is ${kw[2]}.`
    case 'directive':
      return `${topic}: the situation rests on ${kw[0]}, and what actually holds it is ${kw[1]}.`
  }
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

  const signals = analyseSpread(draws)
  const overview = describeSignals(signals, draws.length, lang)
  const arc = connectingLine(draws, spreadShape(draws), topics[tone][lang], lang)

  return [overview, arc, buildClosing(draws, lang)].filter(Boolean).join(' ')
}
