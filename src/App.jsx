import { useCallback, useState } from 'react'
import IntroScreen from './components/IntroScreen.jsx'
import Room from './components/Room.jsx'
import ConstellationScene from './components/ConstellationScene.jsx'
import NameReveal from './components/NameReveal.jsx'
import FinalScreen from './components/FinalScreen.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import { useAudio } from './hooks/useAudio.js'

export default function App() {
  const [stage, setStage] = useState('intro')
  const { isPlaying, isMuted, tryPlay, togglePlay, toggleMute } = useAudio()

  const goToRoom = useCallback(() => {
    tryPlay() // Attempt 2: start on the first real gesture if autoplay was blocked
    setStage('room')
  }, [tryPlay])
  const goToConstellation = useCallback(() => setStage('constellation'), [])
  const goToReveal = useCallback(() => setStage('reveal'), [])
  const goToFinal = useCallback(() => setStage('final'), [])

  return (
    <div className="min-h-[100dvh] w-full bg-ink">
      {stage !== 'intro' && (
        <MusicPlayer isPlaying={isPlaying} isMuted={isMuted} onToggle={togglePlay} onMute={toggleMute} />
      )}

      {stage === 'intro' && <IntroScreen onEnter={goToRoom} />}
      {stage === 'room' && <Room onReady={goToConstellation} />}
      {stage === 'constellation' && <ConstellationScene onComplete={goToReveal} />}
      {stage === 'reveal' && <NameReveal onSettled={goToFinal} />}
      {stage === 'final' && <FinalScreen />}
    </div>
  )
}
