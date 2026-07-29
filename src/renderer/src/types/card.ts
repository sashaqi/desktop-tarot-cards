export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'
export type Orientation = 'upright' | 'reversed'
export type Language = 'zh' | 'en'
export type Element = 'fire' | 'water' | 'air' | 'earth'

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
  /** Classical elemental attribution — drives the structural read of a spread. */
  element?: Element
  keywords: {
    upright: Localized<string[]>
    reversed: Localized<string[]>
  }
  meaning: {
    upright: Localized<string>
    reversed: Localized<string>
  }
  /** What the imagery is doing — orientation-independent. */
  symbolism: Localized<string>
  /** The caution or blind spot to hold alongside the reading. */
  watchFor: {
    upright: Localized<string>
    reversed: Localized<string>
  }
  image: string
}
