import major from './major.json'
import wands from './wands.json'
import cups from './cups.json'
import swords from './swords.json'
import pentacles from './pentacles.json'
import { CardMeaning } from '../../types/card'

/**
 * The deck, authored one file per suit so each stays reviewable on its own.
 * Order matters only for display in dev tooling — the app shuffles anyway.
 */
export const deck = [...major, ...wands, ...cups, ...swords, ...pentacles] as CardMeaning[]

if (deck.length !== 78) {
  throw new Error(`Expected a 78-card deck, got ${deck.length}`)
}
