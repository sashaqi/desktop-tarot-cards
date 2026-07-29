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
  signals: {
    majorCount: number
    reversedCount: number
    dominantSuit: string | null
    dominantElement: string | null
    repeatedNumbers: number[]
  }
}

declare global {
  interface Window {
    // Undefined when the renderer runs without the Electron preload bridge.
    api?: {
      hasApiKey: () => Promise<boolean>
      apiKeyPath: () => Promise<string>
      saveApiKey: (key: string) => Promise<boolean>
      clearApiKey: () => Promise<boolean>
      generateReading: (
        req: AiReadingRequest
      ) => Promise<{ ok: true; text: string } | { ok: false; error: string }>
    }
  }
}
