import { CardMeaning, Orientation } from '../types/card'
import { CategoryDefinition } from '../types/spread'
import { DrawnCard } from '../types/reading'

export function randomOrientation(): Orientation {
  return Math.random() < 0.5 ? 'reversed' : 'upright'
}

export function assignDraw(card: CardMeaning, drawIndex: number, category: CategoryDefinition): DrawnCard {
  const position = category.positions[drawIndex]
  return {
    card,
    orientation: randomOrientation(),
    position
  }
}
