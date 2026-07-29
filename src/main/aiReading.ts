import Anthropic from '@anthropic-ai/sdk'
import { readApiKey } from './apiKeyStore'

export interface AiReadingCard {
  position: string
  positionDescription: string
  name: string
  orientation: 'upright' | 'reversed'
  keywords: string[]
  localMeaning: string
}

export interface AiReadingRequest {
  language: 'zh' | 'en'
  question: string
  categoryName: string
  cards: AiReadingCard[]
}

const SYSTEM = `You are a thoughtful tarot reader. You are given a querent's question and the three cards they drew, each with its position in the spread and the deck's stock meaning.

Write a reading that actually answers their question — connect the three cards into one coherent narrative rather than restating each card's stock meaning in turn. Be warm and grounded, not mystical filler. Never predict health, legal, or financial outcomes as fact; frame everything as reflection and perspective.

Respond with plain prose only — no markdown, no headings, no bullet points. Keep it to roughly 150-200 words.`

export async function generateAiReading(req: AiReadingRequest): Promise<string> {
  const apiKey = readApiKey()
  if (!apiKey) throw new Error('NO_API_KEY')

  const client = new Anthropic({ apiKey })

  const cardLines = req.cards
    .map(
      (c) =>
        `- ${c.position} (${c.positionDescription}): ${c.name}, ${c.orientation}. Keywords: ${c.keywords.join(', ')}. Stock meaning: ${c.localMeaning}`
    )
    .join('\n')

  const languageLine =
    req.language === 'zh'
      ? 'Write the reading in Simplified Chinese.'
      : 'Write the reading in English.'

  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    // A tarot reading is deliberately short prose; this cap is generous for ~200 words.
    max_tokens: 1024,
    system: SYSTEM,
    messages: [
      {
        role: 'user',
        content: `${languageLine}

Spread type: ${req.categoryName}
The querent asked: "${req.question}"

Cards drawn:
${cardLines}`
      }
    ]
  })

  return response.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim()
}
