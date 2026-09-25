import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DeskIcon, BookIcon, DrawerIcon, LampIcon, NoteIcon, StarIcon } from './icons.jsx'
import { desk, book, drawer, lamp, wallNote, hiddenStar, polaroids } from '../data/content.js'
import SkyWindow from './SkyWindow.jsx'

// Add more objects here as you grow the room — same shape, new entry.
// (headphones, calendar, flower, cup, an empty frame are natural next ones)
const objects = [
  { id: 'desk', Icon: DeskIcon, x: '18%', y: '68%', label: desk.label, items: desk.items },
  { id: 'book', Icon: BookIcon, x: '72%', y: '62%', label: book.label, items: book.items },
  { id: 'drawer', Icon: DrawerIcon, x: '30%', y: '82%', label: drawer.label, items: drawer.items },
  { id: 'lamp', Icon: LampIcon, x: '80%', y: '30%', label: null, text: lamp.text },
  { id: 'wallNote', Icon: NoteIcon, x: '55%', y: '20%', label: null, text: wallNote.text },
  {
    id: 'hiddenStar',
    Icon: StarIcon,
    x: '10%',
    y: '14%',
    label: null,
    text: hiddenStar.text,
    hidden: true,
  },
]

function RoomObject({ obj, onOpen, discovered }) {
  const { Icon, x, y, hidden } = obj
  return (
    <motion.button
      type="button"
      aria-label={obj.label || 'a small detail'}
      onClick={() => onOpen(obj)}
      className={
        'absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-3 text-ink/70 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 '
        + (hidden ? 'opacity-30 hover:opacity-90' : 'opacity-90')
      }
      style={{ left: x, top: y }}
      whileTap={{ scale: 0.9 }}
      animate={discovered ? { scale: [1, 1.15, 1] } : {}}
      transition={{ duration: 0.6 }}
    >
      <Icon className="h-7 w-7 drop-shadow-sm sm:h-8 sm:w-8" />
      {discovered && (
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-ink/50" />
      )}
    </motion.button>
  )
}

function RevealPanel({ obj, onClose }) {
  return (
    <AnimatePresence>
      {obj && (
        <motion.div
          className="fixed inset-0 z-30 flex items-end justify-center bg-ink/30 px-4 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full rounded-t-2xl bg-ivory px-6 py-7 shadow-xl sm:max-w-sm sm:rounded-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
          >
            {obj.label && (
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ink/50">{obj.label}</p>
            )}
            {obj.items ? (
              <ul className="space-y-2 font-serif-body text-lg leading-relaxed text-ink">
                {obj.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="font-serif-body text-xl leading-relaxed text-ink">{obj.text}</p>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-6 text-xs uppercase tracking-[0.2em] text-ink/50 hover:text-ink"
            >
              close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Room({ onReady }) {
  const [active, setActive] = useState(null)
  const [discovered, setDiscovered] = useState(() => new Set())

  const handleOpen = (obj) => {
    setActive(obj)
    setDiscovered((prev) => new Set(prev).add(obj.id))
  }

  const warmth = discovered.size / objects.length

  return (
    <div
      className="relative min-h-[100dvh] w-full overflow-hidden transition-colors duration-1000"
      style={{
        background:
          warmth > 0.6
            ? 'linear-gradient(180deg, #E7DCCB 0%, #E8D5D4 100%)'
            : warmth > 0.25
              ? 'linear-gradient(180deg, #DDD6E8 0%, #D7E0E7 100%)'
              : 'linear-gradient(180deg, #2c2a3a 0%, #40405a 100%)',
      }}
    >
      <div className="absolute left-1/2 top-4 -translate-x-1/2 px-6 pt-[env(safe-area-inset-top)] text-center">
        <p className="font-serif-display text-sm tracking-[0.15em] text-ink/60">the little things</p>
      </div>

      {objects.map((obj) => (
        <RoomObject key={obj.id} obj={obj} onOpen={handleOpen} discovered={discovered.has(obj.id)} />
      ))}

      <div className="absolute right-[8%] top-[16%] w-24 sm:w-28">
        <SkyWindow onComplete={onReady} />
      </div>

      {polaroids.length > 0 && (
        <div className="absolute bottom-[10%] left-1/2 flex -translate-x-1/2 gap-2">
          {polaroids.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              aria-label="a small photograph"
              onClick={() => handleOpen({ id: p.id, label: null, text: p.caption })}
              className="h-14 w-11 rounded-sm bg-ivory/90 shadow-md"
              style={{ transform: `rotate(${(i - 1) * 6}deg)` }}
              whileTap={{ scale: 0.94 }}
            />
          ))}
        </div>
      )}

      <RevealPanel obj={active} onClose={() => setActive(null)} />
    </div>
  )
}
