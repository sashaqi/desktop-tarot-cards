import { useReading } from '../context/ReadingContext'
import { CardFan } from './CardFan'

export function DeckScreen(): JSX.Element {
  const { category, shuffledDeck, draws, pickCard } = useReading()

  return (
    <div className="screen deck-screen">
      <div className="deck-header">
        <h2 className="comic-title comic-title--small">{category?.nameLocalized} · 凭直觉选出 3 张牌</h2>
        <div className="pick-progress">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`pick-dot ${i < draws.length ? 'pick-dot--filled' : ''}`} />
          ))}
        </div>
      </div>
      <CardFan deck={shuffledDeck} draws={draws} onPick={pickCard} />
    </div>
  )
}
