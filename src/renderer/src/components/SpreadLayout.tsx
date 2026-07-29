import { DrawnCard } from '../types/reading'
import { TarotCard } from './TarotCard'
import { FLIP_STAGGER_MS } from '../styles/motion'

export function SpreadLayout({ draws }: { draws: DrawnCard[] }): JSX.Element {
  return (
    <div className="spread-layout">
      {draws.map((draw, i) => (
        <TarotCard key={draw.card.id} draw={draw} delayMs={i * FLIP_STAGGER_MS} />
      ))}
    </div>
  )
}
