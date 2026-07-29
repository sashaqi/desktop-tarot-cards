import { CardMeaning, Orientation } from './card'
import { SpreadPosition } from './spread'

export interface DrawnCard {
  card: CardMeaning
  orientation: Orientation
  position: SpreadPosition
}
