import { palette } from './palette'
import { SharedDefs } from './patterns'
import { CARD_W, CARD_H, CARD_BORDER } from './CardFrame'

const W = CARD_W
const H = CARD_H
const BORDER = CARD_BORDER

/**
 * Shared face-down design — the RWS scan dataset has no back image, so this
 * is a single hand-drawn comic-style back used for every card in the deck.
 */
export function CardBack(): JSX.Element {
  const cx = W / 2
  const cy = H / 2
  const rays = Array.from({ length: 12 }, (_, i) => i * 30)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="card-frame-svg" role="img" aria-label="Tarot card back">
      <SharedDefs />

      <rect x={0} y={0} width={W} height={H} rx={10} fill={palette.ink} />
      <rect x={4} y={4} width={W - 8} height={H - 8} rx={7} fill={palette.accentBlue} />
      <rect x={4} y={4} width={W - 8} height={H - 8} rx={7} fill="url(#hatch-diagonal)" opacity={0.3} />

      <rect
        x={BORDER}
        y={BORDER}
        width={W - BORDER * 2}
        height={H - BORDER * 2}
        fill="none"
        stroke={palette.paper}
        strokeWidth={3}
      />

      {/* radiant burst */}
      <g stroke={palette.accentYellow} strokeWidth={4} strokeLinecap="round">
        {rays.map((deg) => {
          const rad = (deg * Math.PI) / 180
          const r1 = 60
          const r2 = 130
          return (
            <line
              key={deg}
              x1={cx + r1 * Math.cos(rad)}
              y1={cy + r1 * Math.sin(rad)}
              x2={cx + r2 * Math.cos(rad)}
              y2={cy + r2 * Math.sin(rad)}
            />
          )
        })}
      </g>

      {/* central moon-eye emblem */}
      <circle cx={cx} cy={cy} r={54} fill={palette.paper} stroke={palette.ink} strokeWidth={5} />
      <circle cx={cx} cy={cy} r={54} fill="url(#halftone-mid)" opacity={0.5} />
      <circle cx={cx} cy={cy} r={24} fill={palette.accentRed} stroke={palette.ink} strokeWidth={4} />
      <circle cx={cx} cy={cy} r={9} fill={palette.ink} />

      {/* corner stars */}
      {[
        [BORDER + 26, BORDER + 26],
        [W - BORDER - 26, BORDER + 26],
        [BORDER + 26, H - BORDER - 26],
        [W - BORDER - 26, H - BORDER - 26]
      ].map(([x, y], i) => (
        <path
          key={i}
          d={starPath(x, y, 6, 14, 6)}
          fill={palette.accentYellow}
          stroke={palette.ink}
          strokeWidth={2}
        />
      ))}
    </svg>
  )
}

function starPath(cx: number, cy: number, points: number, outerR: number, innerR: number): string {
  const step = Math.PI / points
  let d = ''
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR
    const angle = i * step - Math.PI / 2
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    d += i === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `
  }
  return d + 'Z'
}
