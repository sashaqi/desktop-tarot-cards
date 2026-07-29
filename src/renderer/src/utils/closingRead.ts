import { DrawnCard } from '../types/reading'
import { Element, Language, Localized } from '../types/card'

/**
 * Builds the closing of a reading.
 *
 * The old closer picked one of twelve pre-written sentences using nothing but
 * the reversal count, so the same spread-theme always ended the same way no
 * matter which cards turned up. This builds it from the cards instead:
 *
 *   [a relational pattern, when one is present] + [the directional card's own caution]
 *
 * The patterns here deliberately avoid what the opening census already covers
 * (major/minor ratio, dominant suit, all-reversed, repeated numbers) — these
 * are about how the cards relate to each other, which is the part a reader
 * comments on last.
 */

const isCourt = (d: DrawnCard): boolean => d.card.arcana === 'minor' && d.card.number >= 11
const isAce = (d: DrawnCard): boolean => d.card.arcana === 'minor' && d.card.number === 1
const isTen = (d: DrawnCard): boolean => d.card.arcana === 'minor' && d.card.number === 10

/**
 * A polarity worth remarking on means the spread is *made of* the two opposing
 * elements, with both present — not merely that both happen to appear somewhere.
 * The looser test fired on over half of all spreads, which made the observation
 * meaningless and the sentence repetitive.
 */
function isPolarity(draws: DrawnCard[], a: Element, b: Element): boolean {
  const elements = draws.map((d) => d.card.element)
  if (elements.some((e) => e !== a && e !== b)) return false
  return elements.includes(a) && elements.includes(b)
}

interface Pattern {
  id: string
  test: (draws: DrawnCard[]) => boolean
  lead: Localized<string>
}

/** Checked in order; the first match wins, so the most specific come first. */
const patterns: Pattern[] = [
  {
    id: 'ace-and-ten',
    test: (d) => d.some(isAce) && d.some(isTen),
    lead: {
      zh: '牌阵里同时出现了首牌和十——一个循环正在收尾，另一个已经起头，这两件事多半是同一件。',
      en: 'An Ace and a Ten in the same spread — one cycle is closing while another has already started, and they are usually the same story.'
    }
  },
  {
    id: 'court-cluster',
    test: (d) => d.filter(isCourt).length >= 2,
    lead: {
      zh: '三张里有两张宫廷牌，说明这件事的关键在人不在事——推动或卡住它的是某些具体的人，包括你自己的姿态。',
      en: 'Two of the three are court cards, which says this turns on people rather than circumstances — including the stance you are taking in it.'
    }
  },
  {
    id: 'polarity-fire-water',
    test: (d) => isPolarity(d, 'fire', 'water'),
    lead: {
      zh: '整个牌阵由火与水两种元素构成，想做的和想要的正面对上了——这种拉扯不该靠压住一边来解决。',
      en: 'The whole spread is built from fire and water: what you want to do is squarely up against what you want. That pull isn’t resolved by suppressing either side.'
    }
  },
  {
    id: 'polarity-earth-air',
    test: (d) => isPolarity(d, 'earth', 'air'),
    lead: {
      zh: '整个牌阵由土与风两种元素构成，想法和落地正面对上了——差的通常不是判断，是把判断变成具体动作的那一步。',
      en: 'The whole spread is built from earth and air: the thinking is squarely up against the doing. What’s missing is rarely the judgement — it’s the step that turns it into an action.'
    }
  },
  {
    id: 'ace-present',
    test: (d) => d.some(isAce),
    lead: {
      zh: '牌阵里有一张首牌，说明有什么正在开始——它还很嫩，值得护着点。',
      en: 'There’s an Ace here, which means something is beginning. It’s young yet, and worth protecting.'
    }
  },
  {
    id: 'major-directional',
    test: (d) => d.length > 0 && d[d.length - 1].card.arcana === 'major',
    lead: {
      zh: '落在最后一个位置的是大阿尔卡纳，说明方向不在技巧层面——不是做法不对，是这件事本身要转向了。',
      en: 'A Major Arcana lands in the final position, which puts the answer above technique — it isn’t that the method is wrong, it’s that the thing itself is turning.'
    }
  }
]

/** Role of the last position in each spread — always the forward-looking one. */
type Directional = 'advice' | 'future' | 'relationship'

function directionalRole(positionId: string): Directional {
  if (positionId === 'future') return 'future'
  if (positionId === 'relationship') return 'relationship'
  return 'advice' // advice, guidance, and anything else added later
}

/**
 * Two phrasings per role: one that continues from a pattern lead, one that has
 * to stand on its own. Which applies is decided by the cards, not at random.
 */
const anchors: Record<Directional, { afterLead: Localized<string>; alone: Localized<string> }> = {
  advice: {
    afterLead: {
      zh: '具体怎么做，{position}位的{card}说得很清楚：{watch}',
      en: 'As for what to do about it, {card} in the {position} position is explicit: {watch}'
    },
    alone: {
      zh: '如果只带走一句，那就是{position}位的{card}给的这句：{watch}',
      en: 'If you take one thing from this, take what {card} in the {position} position says: {watch}'
    }
  },
  future: {
    afterLead: {
      zh: '照这个走向，{position}位的{card}提醒的是：{watch}',
      en: 'On this trajectory, {card} in the {position} position flags one thing: {watch}'
    },
    alone: {
      zh: '往前看，{position}位的{card}真正要提醒的是：{watch}',
      en: 'Looking ahead, what {card} in the {position} position actually flags is this: {watch}'
    }
  },
  relationship: {
    afterLead: {
      zh: '回到你们之间，{position}位的{card}指出的是：{watch}',
      en: 'Back to what’s between you: {card} in the {position} position points at this — {watch}'
    },
    alone: {
      zh: '就你们之间这件事，{position}位的{card}指出的是：{watch}',
      en: 'On what’s between the two of you, {card} in the {position} position points at this — {watch}'
    }
  }
}

/**
 * English card names fall into three shapes, and each takes a different article:
 * "The Empress" already carries one, "Six of Cups" needs one added, and the
 * abstract-noun majors (Strength, Justice, Death, Temperance, Judgement) take
 * none at all. Templates therefore omit the article and let this supply it.
 */
function cardPhrase(draw: DrawnCard, lang: Language): string {
  if (lang === 'zh') return draw.card.nameLocalized
  const name = draw.card.name
  if (name.startsWith('The ')) return `the ${name.slice(4)}`
  if (name.includes(' of ')) return `the ${name}`
  return name
}

export function buildClosing(draws: DrawnCard[], lang: Language): string {
  if (draws.length === 0) return ''

  const last = draws[draws.length - 1]
  const role = directionalRole(last.position.id)
  const lead = patterns.find((p) => p.test(draws))?.lead[lang] ?? ''

  const anchor = (lead ? anchors[role].afterLead : anchors[role].alone)[lang]
    .replace('{position}', lang === 'zh' ? last.position.labelLocalized : last.position.label)
    .replace('{card}', cardPhrase(last, lang))
    .replace('{watch}', last.card.watchFor[last.orientation][lang])

  return lead ? `${lead}${lang === 'zh' ? '' : ' '}${anchor}` : anchor
}
