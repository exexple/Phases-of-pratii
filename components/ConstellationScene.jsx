import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { stars, pathOrder } from '../data/stars.js'
import { skyLines } from '../data/content.js'

export default function ConstellationScene({ onComplete }) {
  const [active, setActive] = useState(() => new Set())
  const [pulse, setPulse] = useState(null)
  const [finished, setFinished] = useState(false)

  const correctIds = useMemo(() => stars.filter((s) => s.correct).map((s) => s.id), [])
  const byId = useMemo(() => Object.fromEntries(stars.map((s) => [s.id, s])), [])

  const handleTap = (star) => {
    if (finished) return
    if (star.correct) {
      const next = new Set(active).add(star.id)
      setActive(next)
      if (correctIds.every((id) => next.has(id))) {
        setFinished(true)
        setTimeout(() => onComplete?.(), 1600)
      }
    } else {
      setPulse(star.id)
      setTimeout(() => setPulse(null), 400)
    }
  }

  const segments = []
  for (let i = 0; i < pathOrder.length - 1; i++) {
    const a = pathOrder[i]
    const b = pathOrder[i + 1]
    if (active.has(a) && active.has(b)) segments.push([byId[a], byId[b]])
  }

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#0A0B18] px-6 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <p className="mb-4 font-serif-body text-sm italic text-ivory/60">{skyLines.stars}</p>
      <svg viewBox="0 0 400 520" className="h-[70vh] max-h-[560px] w-full max-w-sm">
        {segments.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#F8F4EE"
            strokeWidth={1}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8 }}
          />
        ))}
        {stars.map((s) => (
          <g key={s.id}>
            <circle
              cx={s.x}
              cy={s.y}
              r={pulse === s.id ? 6 : active.has(s.id) ? 5 : 3}
              fill="#F8F4EE"
              opacity={active.has(s.id) ? 1 : 0.45}
              style={{ transition: 'r 0.3s ease, opacity 0.3s ease' }}
            />
            {/* generous invisible hit area so touch doesn't need to be pixel-perfect */}
            <circle
              cx={s.x}
              cy={s.y}
              r={16}
              fill="transparent"
              onClick={() => handleTap(s)}
              style={{ cursor: 'pointer' }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
