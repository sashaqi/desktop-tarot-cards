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
