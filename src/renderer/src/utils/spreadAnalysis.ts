import { DrawnCard } from '../types/reading'
import { Element, Language, Suit } from '../types/card'

/**
 * The structural signals a reader notices before interpreting any single card:
 * how much of the spread is Major Arcana, whether one suit dominates, how much
 * is reversed, and whether a number repeats. These carry more weight than any
 * individual card's stock meaning.
 */
export interface SpreadSignals {
  majorCount: number
  reversedCount: number
  /** Set only when a suit holds a strict majority of the minors drawn. */
  dominantSuit: Suit | null
  /** Set only when the same element covers at least two cards. */
  dominantElement: Element | null
  /** Numbers appearing on more than one card. */
  repeatedNumbers: number[]
}

export function analyseSpread(draws: DrawnCard[]): SpreadSignals {
  const majorCount = draws.filter((d) => d.card.arcana === 'major').length
  const reversedCount = draws.filter((d) => d.orientation === 'reversed').length

  const suitTally = new Map<Suit, number>()
  for (const d of draws) {
    if (d.card.suit) suitTally.set(d.card.suit, (suitTally.get(d.card.suit) ?? 0) + 1)
  }
  const topSuit = [...suitTally.entries()].sort((a, b) => b[1] - a[1])[0]
  const dominantSuit = topSuit && topSuit[1] >= 2 ? topSuit[0] : null

  const elementTally = new Map<Element, number>()
  for (const d of draws) {
    if (d.card.element) elementTally.set(d.card.element, (elementTally.get(d.card.element) ?? 0) + 1)
  }
  const topElement = [...elementTally.entries()].sort((a, b) => b[1] - a[1])[0]
  const dominantElement = topElement && topElement[1] >= 2 ? topElement[0] : null

  const numberTally = new Map<number, number>()
  for (const d of draws) numberTally.set(d.card.number, (numberTally.get(d.card.number) ?? 0) + 1)
  const repeatedNumbers = [...numberTally.entries()]
    .filter(([, n]) => n > 1)
    .map(([num]) => num)

  return { majorCount, reversedCount, dominantSuit, dominantElement, repeatedNumbers }
}

const suitTheme: Record<Suit, Record<Language, string>> = {
  wands: { zh: '行动与热情', en: 'drive and momentum' },
  cups: { zh: '情感与关系', en: 'feeling and connection' },
  swords: { zh: '思虑与沟通', en: 'thinking and what gets said' },
  pentacles: { zh: '现实与资源', en: 'money, work and the material' }
}

/**
 * Renders the signals as the opening observation of a reading — the "what kind
 * of spread is this" line a reader gives before touching any single card.
 */
export function describeSignals(signals: SpreadSignals, total: number, lang: Language): string {
  const parts: string[] = []
  const { majorCount, reversedCount, dominantSuit, repeatedNumbers } = signals

  if (majorCount === total) {
    parts.push(
      lang === 'zh'
        ? '三张全是大阿尔卡纳，说明这件事的分量超出日常范围，多半是一个阶段性的转折。'
        : 'All three are Major Arcana — this sits above everyday matters and is likely a turning point rather than a passing episode.'
    )
  } else if (majorCount === 0) {
    parts.push(
      lang === 'zh'
        ? '全部是小阿尔卡纳，说明这件事仍在日常可处理的范围内，不是命运级的议题。'
        : 'All three are Minor Arcana — this is still in the range of things you handle day to day, not a matter of fate.'
    )
  } else if (majorCount >= 2) {
    parts.push(
      lang === 'zh'
        ? '大阿尔卡纳占了多数，说明推动局面的力量比你以为的大。'
        : 'Major Arcana outnumber the minors, which says the forces moving this are larger than they appear.'
    )
  } else {
    // Exactly one Major — the remaining case, so the overview always opens
    // with an observation rather than occasionally starting empty.
    parts.push(
      lang === 'zh'
        ? '一张大阿尔卡纳夹在小牌之间，说明日常的事情底下有一个更大的主题在起作用。'
        : 'A single Major among the minors — a larger theme is running underneath the everyday details.'
    )
  }

  if (dominantSuit) {
    const theme = suitTheme[dominantSuit][lang]
    parts.push(
      lang === 'zh'
        ? `牌面集中在${theme}上，问题的重心在这里。`
        : `The spread clusters around ${theme} — that's where the weight of this sits.`
    )
  }

  if (reversedCount === total) {
    parts.push(
      lang === 'zh'
        ? '三张全为逆位，能量整体是受阻的——这种时候通常不该强推。'
        : 'All three are reversed: the energy is blocked across the board, and this is rarely a moment to push.'
    )
  } else if (reversedCount === 0) {
    parts.push(
      lang === 'zh'
        ? '三张全为正位，事情是顺着走的，阻力不大。'
        : 'All three upright — this is running with the grain, not against it.'
    )
  }

  if (repeatedNumbers.length > 0) {
    const n = repeatedNumbers[0]
    parts.push(
      lang === 'zh'
        ? `有两张牌同为${n}，同一个主题从不同角度出现了两次，值得特别留意。`
        : `Two cards share the number ${n} — the same theme is showing up twice from different angles, which is worth noting.`
    )
  }

  // Chinese runs sentences together; English needs the space between them.
  return parts.join(lang === 'zh' ? '' : ' ')
}
