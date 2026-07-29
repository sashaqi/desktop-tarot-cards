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
  reversed: { zh: '逆位', en: 'Reversed' }
} satisfies Record<string, Localized<string>>
