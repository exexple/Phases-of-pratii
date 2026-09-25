import { motion } from 'framer-motion'

export default function IntroScreen({ onEnter }) {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#14152A] px-6 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] text-center">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="font-serif-display text-3xl tracking-wide text-ivory sm:text-4xl"
      >
        the little things
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-4 font-serif-body text-sm italic text-ivory/60 sm:text-base"
      >
        a small place for things that usually go unnoticed.
      </motion.p>
      <motion.button
        type="button"
        onClick={onEnter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="mt-12 text-xs uppercase tracking-[0.3em] text-ivory/70 underline underline-offset-8 hover:text-ivory"
      >
        enter
      </motion.button>
    </div>
  )
}
