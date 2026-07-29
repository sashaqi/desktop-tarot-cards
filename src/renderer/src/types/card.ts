export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'
export type Orientation = 'upright' | 'reversed'
export type Language = 'zh' | 'en'

export interface Localized<T> {
  zh: T
  en: T
}

export interface CardMeaning {
  id: string
  number: number
  name: string
  nameLocalized: string
  arcana: Arcana
  suit?: Suit
  keywords: {
    upright: Localized<string[]>
    reversed: Localized<string[]>
  }
  meaning: {
    upright: Localized<string>
    reversed: Localized<string>
  }
  image: string
}
