const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function DeskIcon(props) {
  return (
    <svg viewBox="0 0 32 32" {...common} {...props}>
      <path d="M4 22h24M7 22V12h18v10M11 12V8h10v4" />
    </svg>
  )
}

export function BookIcon(props) {
  return (
    <svg viewBox="0 0 32 32" {...common} {...props}>
      <path d="M16 8c-3-2-7-2-10-1v17c3-1 7-1 10 1 3-2 7-2 10-1V7c-3-1-7-1-10 1Z" />
      <path d="M16 8v17" />
    </svg>
  )
}

export function DrawerIcon(props) {
  return (
    <svg viewBox="0 0 32 32" {...common} {...props}>
      <rect x="5" y="6" width="22" height="20" rx="1" />
      <path d="M5 16h22M13 21h6" />
    </svg>
  )
}

export function LampIcon(props) {
  return (
    <svg viewBox="0 0 32 32" {...common} {...props}>
      <path d="M11 8h10l3 8H8l3-8Z" />
      <path d="M16 16v10M12 26h8" />
    </svg>
  )
}

export function NoteIcon(props) {
  return (
    <svg viewBox="0 0 32 32" {...common} {...props}>
      <path d="M8 4h13l3 3v21H8Z" />
      <path d="M21 4v3h3M12 14h8M12 18h8M12 22h5" />
    </svg>
  )
}

export function StarIcon(props) {
  return (
    <svg viewBox="0 0 32 32" {...common} {...props}>
      <path d="M16 5l2.6 7.8H27l-6.7 4.8 2.6 7.9L16 20.7l-6.9 4.8 2.6-7.9L5 12.8h8.4Z" />
    </svg>
  )
}
