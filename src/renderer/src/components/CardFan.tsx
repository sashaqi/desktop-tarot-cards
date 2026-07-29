import { useMemo } from 'react'
import { CardMeaning } from '../types/card'
import { DrawnCard } from '../types/reading'
import { FanCard } from './FanCard'

interface CardFanProps {
  deck: CardMeaning[]
  draws: DrawnCard[]
  onPick: (cardId: string) => void
}

// deterministic pseudo-random tilt per index, so the scattered look doesn't
// jitter on re-render
function tiltFor(index: number): number {
  const seed = Math.sin(index * 999.17) * 10000
  const frac = seed - Math.floor(seed)
  return frac * 6 - 3
}

export function CardFan({ deck, draws, onPick }: CardFanProps): JSX.Element {
  const pickedIds = useMemo(() => new Map(draws.map((d, i) => [d.card.id, i + 1])), [draws])
  const full = draws.length >= 3

  return (
    <div className="card-fan">
      {deck.map((card, i) => (
        <FanCard
          key={card.id}
          cardId={card.id}
          picked={pickedIds.has(card.id)}
          pickOrder={pickedIds.get(card.id) ?? null}
          disabled={full}
          tilt={tiltFor(i)}
          onPick={onPick}
        />
      ))}
    </div>
  )
}
