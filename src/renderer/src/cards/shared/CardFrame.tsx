import { palette } from './palette'
import { SharedDefs } from './patterns'

export const CARD_W = 350
export const CARD_H = 600
export const CARD_BORDER = 14

const W = CARD_W
const H = CARD_H
const BORDER = CARD_BORDER
const BANNER_H = 76

interface CardFrameProps {
  imageSrc: string
  title: string
  accent?: string
}

/**
 * Comic-book style frame around a real card photo: thick ink border, corner
 * brackets, a halftone-textured title banner. All 78 cards share this exact
 * skeleton — only the embedded photo and title text differ.
 */
export function CardFrame({ imageSrc, title, accent = palette.accentRed }: CardFrameProps): JSX.Element {
  const imgX = BORDER
  const imgY = BORDER
  const imgW = W - BORDER * 2
  const imgH = H - BORDER - BANNER_H - BORDER

  const bracket = 28

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="card-frame-svg" role="img" aria-label={title}>
      <SharedDefs />

      {/* outer ink border */}
      <rect x={0} y={0} width={W} height={H} rx={10} fill={palette.ink} />
      {/* paper backing */}
      <rect x={4} y={4} width={W - 8} height={H - 8} rx={7} fill={palette.paper} />

      {/* photo window */}
      <image
        href={imageSrc}
        x={imgX}
        y={imgY}
        width={imgW}
        height={imgH}
        preserveAspectRatio="xMidYMid slice"
        clipPath="inset(0 round 3px)"
      />
      <rect x={imgX} y={imgY} width={imgW} height={imgH} fill="none" stroke={palette.ink} strokeWidth={4} />
      {/* subtle halftone wash across the photo for a screentone/print feel */}
      <rect x={imgX} y={imgY} width={imgW} height={imgH} fill="url(#halftone-light)" opacity={0.5} />

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

      {/* title banner */}
      <rect x={4} y={H - BORDER - BANNER_H} width={W - 8} height={BANNER_H} fill={palette.ink} />
      <rect x={4} y={H - BORDER - BANNER_H} width={W - 8} height={BANNER_H} fill="url(#hatch-diagonal)" opacity={0.4} />
      <text
        x={W / 2}
        y={H - BORDER - BANNER_H / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={palette.paper}
        className="card-frame-title"
      >
        {title}
      </text>
    </svg>
  )
}
