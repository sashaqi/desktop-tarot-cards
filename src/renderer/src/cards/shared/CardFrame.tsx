import { palette } from './palette'
import { SharedDefs } from './patterns'

export const CARD_W = 350
export const CARD_H = 600
export const CARD_BORDER = 12

const W = CARD_W
const H = CARD_H
const BORDER = CARD_BORDER

interface CardFrameProps {
  imageSrc: string
  title: string
  accent?: string
}

/**
 * Comic-book style frame around a real card photo: thick ink border and corner
 * brackets. The card name is rendered as an HTML label outside the frame (see
 * TarotCard) so the artwork itself is never cropped or covered.
 */
export function CardFrame({ imageSrc, title, accent = palette.accentRed }: CardFrameProps): JSX.Element {
  const imgX = BORDER
  const imgY = BORDER
  const imgW = W - BORDER * 2
  const imgH = H - BORDER * 2

  const bracket = 28

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="card-frame-svg" role="img" aria-label={title}>
      <SharedDefs />

      {/* outer ink border */}
      <rect x={0} y={0} width={W} height={H} rx={10} fill={palette.ink} />
      {/* paper backing */}
      <rect x={4} y={4} width={W - 8} height={H - 8} rx={7} fill={palette.paper} />

      {/* photo window — "meet" keeps the whole card face visible, uncropped */}
      <image
        href={imageSrc}
        x={imgX}
        y={imgY}
        width={imgW}
        height={imgH}
        preserveAspectRatio="xMidYMid meet"
      />
      <rect x={imgX} y={imgY} width={imgW} height={imgH} fill="none" stroke={palette.ink} strokeWidth={4} />
      {/* subtle halftone wash across the photo for a screentone/print feel */}
      <rect x={imgX} y={imgY} width={imgW} height={imgH} fill="url(#halftone-light)" opacity={0.35} />

      {/* corner brackets, comic-panel style */}
      {[
        [imgX, imgY, 1, 1],
        [imgX + imgW, imgY, -1, 1],
        [imgX, imgY + imgH, 1, -1],
        [imgX + imgW, imgY + imgH, -1, -1]
      ].map(([x, y, dx, dy], i) => (
        <path
          key={i}
          d={`M ${x} ${y + bracket * dy} L ${x} ${y} L ${x + bracket * dx} ${y}`}
          stroke={accent}
          strokeWidth={5}
          fill="none"
          strokeLinecap="square"
        />
      ))}
    </svg>
  )
}
