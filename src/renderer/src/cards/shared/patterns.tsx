import { palette } from './palette'

/**
 * Shared <defs> block: halftone/screentone dot patterns and a diagonal hatch,
 * referenced via fill="url(#halftone-mid)" etc. Mount once per SVG document
 * that needs them (each card renders its own <svg>, so each CardFrame/CardBack
 * includes this once inside its own <defs>).
 */
export function SharedDefs(): JSX.Element {
  return (
    <defs>
      <pattern id="halftone-mid" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.3" fill={palette.ink} opacity={0.35} />
      </pattern>
      <pattern id="halftone-light" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1" fill={palette.ink} opacity={0.18} />
      </pattern>
      <pattern id="hatch-diagonal" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="6" height="6" fill="transparent" />
        <line x1="0" y1="0" x2="0" y2="6" stroke={palette.ink} strokeWidth="1.5" opacity={0.25} />
      </pattern>
    </defs>
  )
}
