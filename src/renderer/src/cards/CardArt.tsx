import { CardFrame } from './shared/CardFrame'
import { getCardImageUrl } from './imageRegistry'
import { Orientation } from '../types/card'

interface CardArtProps {
  image: string
  title: string
  orientation?: Orientation
}

export function CardArt({ image, title, orientation = 'upright' }: CardArtProps): JSX.Element {
  return (
    <div className={`card-art ${orientation === 'reversed' ? 'card-art--reversed' : ''}`}>
      <CardFrame imageSrc={getCardImageUrl(image)} title={title} />
    </div>
  )
}
