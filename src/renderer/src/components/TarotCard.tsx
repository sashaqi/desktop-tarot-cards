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
  const { language } = useLanguage()

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
    </div>
  )
}
