import music from '../data/music.js'

export default function MusicPlayer({ isPlaying, isMuted, onToggle, onMute }) {
  return (
    <div className="fixed right-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-40 rounded-2xl bg-ink/40 px-3 py-2 text-ivory backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-sm">
          {isPlaying ? '♫' : '♪'}
        </span>
        <div className="hidden leading-tight sm:block">
          <p className="font-serif-body text-xs italic">{music.title}</p>
          <p className="text-[0.6rem] text-ivory/60">{music.artist}</p>
        </div>
        <div className="flex items-center gap-2 text-[0.6rem] tracking-wide">
          <button
            type="button"
            onClick={onToggle}
            aria-label={isPlaying ? 'pause music' : 'play music'}
            className="text-ivory/80 hover:text-ivory"
          >
            {isPlaying ? 'pause' : 'play'}
          </button>
          <button
            type="button"
            onClick={onMute}
            aria-label={isMuted ? 'unmute' : 'mute'}
            className="text-ivory/80 hover:text-ivory"
          >
            {isMuted ? 'unmute' : 'mute'}
          </button>
        </div>
      </div>
    </div>
  )
}
