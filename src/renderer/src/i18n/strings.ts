import { Language, Localized } from '../types/card'

export function pick<T>(value: Localized<T>, lang: Language): T {
  return value[lang]
}

export const ui = {
  appTitle: { zh: '桌面塔罗', en: 'Desktop Tarot' },
  categorySubtitle: { zh: '今天想为哪件事求一个指引？', en: 'What would you like guidance on today?' },
  pickInstruction: { zh: '凭直觉选出 3 张牌', en: 'Pick 3 cards by intuition' },
  yourSpread: { zh: '你的牌阵', en: 'Your Spread' },
  overallReading: { zh: '综合解读', en: 'Overall Reading' },
  restart: { zh: '重新占卜', en: 'Read Again' },
  upright: { zh: '正位', en: 'Upright' },
  reversed: { zh: '逆位', en: 'Reversed' },
  questionTitle: { zh: '你想问什么？', en: 'What do you want to ask?' },
  questionHint: {
    zh: '写下心里真正想问的事，然后凭直觉抽三张牌',
    en: 'Write down what’s really on your mind, then draw three cards'
  },
  questionPlaceholder: {
    zh: '例如：我该接受这个新机会吗？',
    en: 'e.g. Should I take this new opportunity?'
  },
  startDraw: { zh: '开始抽牌', en: 'Start Drawing' },
  back: { zh: '返回', en: 'Back' },
  yourQuestion: { zh: '你的问题', en: 'Your question' },
  aiReading: { zh: 'AI 深度解读', en: 'AI Reading' },
  aiGenerate: { zh: '生成 AI 解读', en: 'Generate AI reading' },
  aiThinking: { zh: '正在解读…', en: 'Reading the cards…' },
  aiRetry: { zh: '重试', en: 'Retry' },
  aiNeedsKey: {
    zh: '需要先填入 Anthropic API Key 才能使用 AI 解读',
    en: 'Add an Anthropic API key to enable AI readings'
  },
  aiFailed: { zh: 'AI 解读失败', en: 'AI reading failed' },
  settings: { zh: '设置', en: 'Settings' },
  apiKeyLabel: { zh: 'Anthropic API Key', en: 'Anthropic API Key' },
  apiKeyHint: {
    zh: '填入后即可使用 AI 深度解读。Key 会用系统钥匙串加密保存在本地，不会上传到任何地方。留空则只用本地牌意库。',
    en: 'Enables AI readings. Stored locally, encrypted with your OS keychain — never uploaded anywhere. Leave empty to use only the local meanings.'
  },
  apiKeySaved: { zh: '已保存', en: 'Saved' },
  storedAt: { zh: '保存位置', en: 'Stored at' },
  symbolism: { zh: '牌面象征', en: 'In the image' },
  watchFor: { zh: '需要留意', en: 'Watch for' },
  save: { zh: '保存', en: 'Save' },
  clear: { zh: '清除', en: 'Clear' },
  close: { zh: '关闭', en: 'Close' }
} satisfies Record<string, Localized<string>>
