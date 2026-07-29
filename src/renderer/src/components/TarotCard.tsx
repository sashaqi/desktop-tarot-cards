import { useEffect, useState } from 'react'
import { CardBack } from '../cards/shared/CardBack'
import { CardArt } from '../cards/CardArt'
import { DrawnCard } from '../types/reading'

interface TarotCardProps {
  draw: DrawnCard
  delayMs: number
}

export function TarotCard({ draw, delayMs }: TarotCardProps): JSX.Element {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFlipped(true), delayMs)
    return () => clearTimeout(timer)
  }, [delayMs])

  return (
    <div className="tarot-slot">
      <div className="position-label">{draw.position.labelLocalized}</div>
      <div className={`tarot-flip ${flipped ? 'tarot-flip--flipped' : ''}`}>
        <div className="tarot-flip__face tarot-flip__face--back">
          <CardBack />
        </div>
        <div className="tarot-flip__face tarot-flip__face--front">
          <CardArt image={draw.card.image} title={draw.card.nameLocalized} orientation={draw.orientation} />
        </div>
      </div>
    </div>
  )
}
