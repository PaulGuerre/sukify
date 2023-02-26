import store from '../store/store.js'
import ApiManager from './ApiManager.js'
import C from '@/constants/constants.js'

class AudioManager {
  constructor () {
    this.audio = new Audio()

    this.audio.volume = 0.5

    this.audio.onended = () => {
      const musicMode = store.getters.musicMode
      if (musicMode === C.REPEAT_MODE) this.play(this.audio.src)
      else this.nextMusic()
    }

    this.audio.ontimeupdate = () => {
      store.dispatch('setMusicTime', (this.audio.currentTime / this.audio.duration) * 100)
    }
  }

  play (url) {
    if (this.audio.src !== url) this.audio.src = url
    this.audio.play()
    store.dispatch('setPlayState', true)
  }

  pause () {
    this.audio.pause()
    store.dispatch('setPlayState', false)
  }

  nextMusic () {
    const musicMode = store.getters.musicMode
    const nextMusicIndex = this.getNextMusicIndex(musicMode)
    const nextMusic = store.getters.currentMusics[nextMusicIndex]
    const nextMusicUrl = ApiManager.getMusicSrc(nextMusic.id)

    this.play(nextMusicUrl)
    store.dispatch('setCurrentMusic', nextMusic)
  }

  prevMusic () {
    const musicMode = store.getters.musicMode
    const prevMusicIndex = this.getPrevMusicIndex(musicMode)
    const prevMusic = store.getters.currentMusics[prevMusicIndex]
    const prevMusicUrl = ApiManager.getMusicSrc(prevMusic.id)

    this.play(prevMusicUrl)
    store.dispatch('setCurrentMusic', prevMusic)
  }

  onDeleteMusic (musicId) {
    this.nextMusic()
    store.dispatch('deleteMusic', musicId)
  }

  getNextMusicIndex (musicMode) {
    const currentMusicIndex = store.getters.currentMusics.findIndex(music => music.id === store.getters.currentMusic.id)

    if (musicMode === C.SHUFFLE_MODE) return Math.floor(Math.random() * store.getters.currentMusics.length)

    return currentMusicIndex + 1 >= store.getters.currentMusics.length ? 0 : currentMusicIndex + 1
  }

  getPrevMusicIndex (musicMode) {
    const currentMusicIndex = store.getters.currentMusics.findIndex(music => music.id === store.getters.currentMusic.id)

    if (musicMode === C.SHUFFLE_MODE) return Math.floor(Math.random() * store.getters.currentMusics.length)

    return currentMusicIndex - 1 < 0 ? store.getters.currentMusics.length - 1 : currentMusicIndex - 1
  }

  getVolume () {
    return this.audio.volume
  }

  setVolume (volume) {
    this.audio.volume = volume
  }
}

export default new AudioManager()
