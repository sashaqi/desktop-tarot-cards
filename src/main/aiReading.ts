import Anthropic from '@anthropic-ai/sdk'
import { readApiKey } from './apiKeyStore'

export interface AiReadingCard {
  position: string
  positionDescription: string
  positionLens: string
  name: string
  arcana: 'major' | 'minor'
  suit?: string
  element?: string
  number: number
  orientation: 'upright' | 'reversed'
  keywords: string[]
  localMeaning: string
  symbolism: string
  watchFor: string
}

export interface AiReadingRequest {
  language: 'zh' | 'en'
  question: string
  categoryName: string
  cards: AiReadingCard[]
  /** Pre-computed structural read of the spread — see utils/spreadAnalysis. */
  signals: {
    majorCount: number
    reversedCount: number
    dominantSuit: string | null
    dominantElement: string | null
    repeatedNumbers: number[]
  }
}

const SYSTEM = `You are an experienced tarot reader giving a three-card reading. You read the way a practised reader does, not the way a card-meaning website does.

How to work:

1. Read the spread's shape first. Before any individual card, notice what the structure says — how many Major Arcana there are (majors mean forces larger than daily choice; all minors means this is workable at the everyday level), whether one suit or element dominates and what that says about where the querent's energy actually is, how much is reversed, and whether a number repeats across cards. The structural read is what separates a reading from three definitions in a row.

2. Then read the cards in their positions. A card means something different in "Past" than in "Advice" — the position lens for each card tells you how that position wants to be read. Use the supplied stock meaning as raw material, not as text to paraphrase.

3. Read the cards against each other. Three cards in a spread are one statement, not three. Look for the tension or the through-line between them: what does the second card do to the first, and where does the third leave it?

4. Land on something the querent can actually use. End with where to put their attention — specific enough to act on this week.

Register: direct, warm, unhurried. You may name a card's number, element or imagery when it carries the point, but never lecture — the symbolism serves the reading, not the other way round. No mystical filler, no flattery, no hedging every sentence into meaninglessness. Say the difficult thing if the cards say it, kindly.

Hard limits: tarot describes patterns and choices, never fixed outcomes. Do not predict medical, legal or financial results, and do not tell the querent what will happen to them. Frame everything as a lens on their situation. If the question is one where a professional matters — health, legal, serious money — say so plainly in one clause and continue with the reading.

Format: flowing prose, no markdown, no headings, no bullets, no card-by-card labels. Roughly 200-260 words.`

function describeCard(c: AiReadingCard): string {
  const bits = [
    `${c.position} — ${c.name} (${c.orientation})`,
    `  Arcana: ${c.arcana}${c.suit ? `, suit ${c.suit}` : ''}${c.element ? `, element ${c.element}` : ''}, number ${c.number}`,
    `  This position: ${c.positionDescription} ${c.positionLens}`,
    `  Stock meaning: ${c.localMeaning}`,
    `  Imagery: ${c.symbolism}`,
    `  Caution: ${c.watchFor}`,
    `  Keywords: ${c.keywords.join(', ')}`
  ]
  return bits.join('\n')
}

function describeSignals(s: AiReadingRequest['signals'], total: number): string {
  const lines = [
    `Major Arcana: ${s.majorCount} of ${total}`,
    `Reversed: ${s.reversedCount} of ${total}`,
    `Dominant suit: ${s.dominantSuit ?? 'none — no suit repeats'}`,
    `Dominant element: ${s.dominantElement ?? 'none — no element repeats'}`,
    `Repeated numbers: ${s.repeatedNumbers.length ? s.repeatedNumbers.join(', ') : 'none'}`
  ]
  return lines.map((l) => `  ${l}`).join('\n')
}

export async function generateAiReading(req: AiReadingRequest): Promise<string> {
  const apiKey = readApiKey()
  if (!apiKey) throw new Error('NO_API_KEY')

  const client = new Anthropic({ apiKey })

  const languageLine =
    req.language === 'zh'
      ? 'Write the reading in Simplified Chinese.'
      : 'Write the reading in English.'

  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    // Prose of ~250 words; this ceiling leaves room without inviting sprawl.
    max_tokens: 1024,
    system: SYSTEM,
    messages: [
      {
        role: 'user',
        content: `${languageLine}

Spread: ${req.categoryName}
The querent asked: "${req.question}"

Structure of this spread:
${describeSignals(req.signals, req.cards.length)}

Cards, in position order:

${req.cards.map(describeCard).join('\n\n')}`
      }
    ]
  })

  return response.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim()
}
