import { motion } from 'framer-motion'
import { finalMessage } from '../data/content.js'

export default function FinalScreen() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#0A0B18] px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="max-w-xs font-serif-body text-lg italic text-ivory/85 sm:text-xl"
      >
        {finalMessage.line1}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.4 }}
        className="mt-6 font-serif-display text-base tracking-wide text-ivory/60"
      >
        {finalMessage.line2}
      </motion.p>
    </div>
  )
}
