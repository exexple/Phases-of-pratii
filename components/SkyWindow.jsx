import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skyLines } from '../data/content.js'

const states = [
  { key: 'sunset', gradient: 'linear-gradient(180deg, #E7C9A8 0%, #D98F7A 100%)', line: skyLines.sunset },
  { key: 'blueHour', gradient: 'linear-gradient(180deg, #6E7FA3 0%, #37395A 100%)', line: skyLines.blueHour },
  { key: 'rain', gradient: 'linear-gradient(180deg, #7C8896 0%, #45505E 100%)', line: skyLines.rain },
  { key: 'clearNight', gradient: 'linear-gradient(180deg, #2B2E4A 0%, #14152A 100%)', line: skyLines.clearNight },
  { key: 'stars', gradient: 'linear-gradient(180deg, #14152A 0%, #05060F 100%)', line: skyLines.stars },
]

function WindowPane(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2} {...props}>
      <rect x="5" y="5" width="22" height="22" rx="1" />
      <path d="M16 5v22M5 16h22" />
    </svg>
  )
}

export default function SkyWindow({ onComplete }) {
  const [index, setIndex] = useState(0)
  const current = states[index]
  const isStars = current.key === 'stars'

  const handleTap = () => {
    if (index < states.length - 1) setIndex(index + 1)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        type="button"
        aria-label="the window"
        onClick={handleTap}
        className="relative h-28 w-24 overflow-hidden rounded-md border border-ink/10 shadow-inner sm:h-32 sm:w-28"
        style={{ background: current.gradient }}
        whileTap={{ scale: 0.97 }}
      >
        <WindowPane className="absolute inset-0 h-full w-full text-ivory/25" />
        {isStars && (
          <span className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="absolute h-[2px] w-[2px] animate-pulse rounded-full bg-white/80"
                style={{
                  left: `${((i * 37) % 90) + 5}%`,
                  top: `${((i * 53) % 80) + 5}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </span>
        )}
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.p
          key={current.key}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="max-w-[9rem] text-center font-serif-body text-xs italic text-ink/60 sm:text-sm"
        >
          {current.line}
        </motion.p>
      </AnimatePresence>

      {isStars && (
        <motion.button
          type="button"
          onClick={onComplete}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-ink/50 underline underline-offset-4 hover:text-ink"
        >
          look closer
        </motion.button>
      )}
    </div>
  )
}
