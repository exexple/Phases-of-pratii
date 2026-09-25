import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { textToPoints } from '../utils/textToPoints.js'
import { stars as constellationStars, pathOrder } from '../data/stars.js'

const NAME = 'PRATIKSHA'
const VIEW_W = 400
const VIEW_H = 200

export default function NameReveal({ onSettled }) {
  const [particles, setParticles] = useState(null)

  useEffect(() => {
    let cancelled = false
    let timeoutId

    async function run() {
      const raw = await textToPoints(NAME, {
        width: 600,
        height: 160,
        fontSize: 92,
        step: 6,
        maxPoints: 140,
      })
      if (cancelled || raw.length === 0) return

      const source = pathOrder
        .map((id) => constellationStars.find((s) => s.id === id))
        .filter(Boolean)

      const next = raw.map((p, i) => ({
        to: { x: (p.x / 600) * VIEW_W, y: (p.y / 160) * VIEW_H + VIEW_H * 0.35 },
        from: source.length
          ? { x: source[i % source.length].x, y: source[i % source.length].y * (VIEW_H / 520) }
          : { x: VIEW_W / 2, y: VIEW_H / 2 },
      }))

      setParticles(next)
      timeoutId = setTimeout(() => onSettled?.(), 2600)
    }

    run()
    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [onSettled])

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center bg-[#0A0B18] px-6">
      <span className="sr-only">Pratiksha</span>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full max-w-md">
        {particles
          && particles.map((particle, i) => (
            <motion.circle
              key={i}
              r={1.6}
              fill="#F8F4EE"
              initial={{ cx: particle.from.x, cy: particle.from.y, opacity: 0.25 }}
              animate={{ cx: particle.to.x, cy: particle.to.y, opacity: 0.95 }}
              transition={{ duration: 1.4, delay: (i % 40) * 0.012, ease: 'easeInOut' }}
            />
          ))}
      </svg>
    </div>
  )
}
