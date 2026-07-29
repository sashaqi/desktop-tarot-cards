export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'
export type Orientation = 'upright' | 'reversed'

export interface CardMeaning {
  id: string
  number: number
  name: string
  nameLocalized: string
  arcana: Arcana
  suit?: Suit
  keywords: {
    upright: string[]
    reversed: string[]
  }
  meaning: {
    upright: string
    reversed: string
  }
  image: string
}
