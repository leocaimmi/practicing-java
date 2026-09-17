/**
 * Iconos en SVG inline. Se dibujan a mano para no sumar una librería de iconos
 * a un bundle que se quiere liviano.
 */

type IconProps = { className?: string }

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function IconTrueFalse({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...STROKE}>
        <rect x="2.5" y="4.5" width="19" height="7" rx="3.5" />
        <path d="M6.5 8l1.4 1.4L10.8 6.6" />
        <rect x="2.5" y="12.5" width="19" height="7" rx="3.5" />
        <path d="M15.6 14.6l3.4 3.4M19 14.6l-3.4 3.4" />
      </g>
    </svg>
  )
}

export function IconMultipleChoice({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...STROKE}>
        <circle cx="5" cy="6" r="2.5" />
        <path d="M10 6h11" />
        <circle cx="5" cy="12" r="2.5" />
        <path d="M3.9 12l.8.8 1.5-1.6" />
        <path d="M10 12h11" />
        <circle cx="5" cy="18" r="2.5" />
        <path d="M10 18h11" />
      </g>
    </svg>
  )
}

export function IconCode({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...STROKE}>
        <path d="M8.5 7.5L4 12l4.5 4.5" />
        <path d="M15.5 7.5L20 12l-4.5 4.5" />
        <path d="M13.4 4.5l-2.8 15" />
      </g>
    </svg>
  )
}

export function IconChallenge({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...STROKE}>
        <rect x="2.5" y="3.5" width="19" height="17" rx="3" />
        <path d="M6.5 9l2.5 2.5L6.5 14" />
        <path d="M12 14.5h5" />
      </g>
    </svg>
  )
}

export function IconExam({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...STROKE}>
        <path d="M6 2.5h8.5L19 7v14.5H6z" />
        <path d="M14 2.5V7h5" />
        <path d="M9 12.5l1.8 1.8 3.6-3.6" />
      </g>
    </svg>
  )
}

export function IconShuffle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...STROKE}>
        <path d="M3 6h3.5l9 12H20" />
        <path d="M3 18h3.5l3-4" />
        <path d="M14.5 8l1.5-2H20" />
        <path d="M17.5 3.5L20.5 6l-3 2.5" />
        <path d="M17.5 15.5L20.5 18l-3 2.5" />
      </g>
    </svg>
  )
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...STROKE}>
        <path d="M4 12h15" />
        <path d="M13 6l6 6-6 6" />
      </g>
    </svg>
  )
}

export function IconSun({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...STROKE}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
      </g>
    </svg>
  )
}

export function IconMoon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...STROKE}>
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
      </g>
    </svg>
  )
}
