import { CardBack } from '../cards/shared/CardBack'

interface FanCardProps {
  cardId: string
  picked: boolean
  pickOrder: number | null
  disabled: boolean
  tilt: number
  onPick: (cardId: string) => void
}

export function FanCard({ cardId, picked, pickOrder, disabled, tilt, onPick }: FanCardProps): JSX.Element {
  return (
    <button
      className={`fan-card ${picked ? 'fan-card--picked' : ''}`}
      style={{ transform: `rotate(${tilt}deg)` }}
      disabled={disabled && !picked}
      onClick={() => onPick(cardId)}
      aria-label="face-down tarot card"
    >
      <CardBack />
      {picked && <span className="fan-card__badge">{pickOrder}</span>}
    </button>
  )
}
