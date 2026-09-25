import { useRef, useState, useCallback, useEffect } from 'react'
import music from '../data/music.js'

export function useAudio() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const audio = new Audio(music.src)
    audio.loop = music.loop
    audio.volume = music.defaultVolume
    audioRef.current = audio

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    // Attempt 1: try to autoplay on load. Browsers usually block this
    // silently until a real user gesture happens — that's expected,
    // see tryPlay() below for the fallback used on the "enter" tap.
    audio.play().catch(() => {})

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const tryPlay = useCallback(() => {
    audioRef.current?.play().catch(() => {})
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }, [])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }, [])

  return { isPlaying, isMuted, tryPlay, togglePlay, toggleMute }
}
