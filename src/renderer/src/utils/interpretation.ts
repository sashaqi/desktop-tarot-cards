import { DrawnCard } from '../types/reading'
import { CategoryId } from '../types/spread'
import { Language } from '../types/card'
import { routeQuestion, RoutedTone } from './questionRouter'
import { analyseSpread, describeSignals } from './spreadAnalysis'

const openers: Record<RoutedTone, Record<Language, string>> = {
  love: { zh: '关于这段感情，三张牌是这样说的：', en: "Here's what the three cards say about this relationship:" },
  career: { zh: '关于这份事业，三张牌是这样说的：', en: "Here's what the three cards say about your career:" },
  wealth: { zh: '关于近期的财运，三张牌是这样说的：', en: "Here's what the three cards say about your finances:" },
  general: { zh: '关于你问的这件事，三张牌是这样说的：', en: "Here's what the three cards say about what you asked:" }
}

type Tone = 'mostlyUpright' | 'mixed' | 'mostlyReversed'

const closers: Record<RoutedTone, Record<Tone, Record<Language, string>>> = {
  love: {
    mostlyUpright: {
      zh: '整体而言，这段关系正朝着顺畅、坦诚的方向发展，保持这份用心。',
      en: 'Overall, this relationship is moving toward smoother, more honest ground — keep tending to it.'
    },
    mixed: {
      zh: '整体而言，感情里有明有暗，值得多花心思去沟通和磨合。',
      en: "Overall, it's a mix of light and shade — worth investing in more communication and patience."
    },
    mostlyReversed: {
      zh: '整体而言，这段关系正经历一些阻碍，先别急着下结论，给彼此多一点耐心。',
      en: "Overall, this relationship is hitting some friction — hold off on conclusions and give it more patience."
    }
  },
  career: {
    mostlyUpright: {
      zh: '整体而言，事业上的努力正在开花结果，可以更主动地把握机会。',
      en: 'Overall, your efforts are paying off — a good time to take initiative on new opportunities.'
    },
    mixed: {
      zh: '整体而言，工作中机会与挑战并存，稳扎稳打会比冒进更可靠。',
      en: 'Overall, opportunity and challenge are both present — steady progress beats a rushed leap.'
    },
    mostlyReversed: {
      zh: '整体而言，眼下阻力较多，先梳理清楚问题所在，再决定下一步。',
      en: "Overall, there's more resistance than usual — get clear on the real problem before your next move."
    }
  },
  wealth: {
    mostlyUpright: {
      zh: '整体而言，财运正稳步向好，是巩固收益、适度扩展的好时机。',
      en: 'Overall, your finances are trending well — a good time to consolidate gains and grow steadily.'
    },
    mixed: {
      zh: '整体而言，收支起伏交织，量入为出会比冒险一搏更稳妥。',
      en: 'Overall, income and spending are in flux — staying within your means beats a big gamble.'
    },
    mostlyReversed: {
      zh: '整体而言，财务上需要多一分谨慎，先理清现状再做决定。',
      en: 'Overall, this calls for extra caution with money — get a clear picture before deciding anything.'
    }
  },
  general: {
    mostlyUpright: {
      zh: '整体而言，近期的能量偏向顺利与成长，适合主动推进计划。',
      en: 'Overall, the energy favors growth and momentum — a good time to push your plans forward.'
    },
    mixed: {
      zh: '整体而言，运势起伏交织，顺其自然、随机应变会更省力。',
      en: 'Overall, fortune is mixed right now — flowing with it will take less effort than forcing it.'
    },
    mostlyReversed: {
      zh: '整体而言，近期需要多一些耐心和自我照顾，避免强求。',
      en: 'Overall, this is a season for patience and self-care rather than pushing too hard.'
    }
  }
}

/**
 * Builds the summary the way a reader works: the shape of the whole spread
 * first, then the cards in their positions, then where to put your attention.
 */
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

  const mood: Tone =
    signals.reversedCount >= 2 ? 'mostlyReversed' : signals.reversedCount === 0 ? 'mostlyUpright' : 'mixed'

  return [overview, openers[tone][lang], ...lines, closers[tone][mood][lang]]
    .filter(Boolean)
    .join(' ')
}
