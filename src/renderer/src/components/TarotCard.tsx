import { useEffect, useState } from 'react'
import { CardBack } from '../cards/shared/CardBack'
import { CardArt } from '../cards/CardArt'
import { DrawnCard } from '../types/reading'
import { useLanguage } from '../context/LanguageContext'

interface TarotCardProps {
  draw: DrawnCard
  delayMs: number
}

export function TarotCard({ draw, delayMs }: TarotCardProps): JSX.Element {
  const [flipped, setFlipped] = useState(false)
  const { language, t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setFlipped(true), delayMs)
    return () => clearTimeout(timer)
  }, [delayMs])

  const posLabel = language === 'zh' ? draw.position.labelLocalized : draw.position.label
  const cardName = language === 'zh' ? draw.card.nameLocalized : draw.card.name

  return (
    <div className="tarot-slot">
      <div className="position-label">{posLabel}</div>
      <div className={`tarot-flip ${flipped ? 'tarot-flip--flipped' : ''}`}>
        <div className="tarot-flip__face tarot-flip__face--back">
          <CardBack />
        </div>
        <div className="tarot-flip__face tarot-flip__face--front">
          <CardArt image={draw.card.image} title={cardName} orientation={draw.orientation} />
        </div>
      </div>
      {/* Name sits under the card so the artwork stays fully visible, and it
          stays upright regardless of the card's orientation. */}
      <div className={`card-name-label ${flipped ? '' : 'card-name-label--hidden'}`}>
        <span className="card-name-label__name">{cardName}</span>
        <span className="card-name-label__orientation">{t(draw.orientation)}</span>
      </div>
    </div>
  )
}
