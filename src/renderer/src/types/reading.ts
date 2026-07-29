import { CardMeaning, Orientation } from './card'
import { CategoryDefinition, SpreadPosition } from './spread'

export interface DrawnCard {
  card: CardMeaning
  orientation: Orientation
  position: SpreadPosition
}

export interface Reading {
  category: CategoryDefinition
  draws: DrawnCard[]
  summary: string
}
