import store from '../store/store.js'
import ApiManager from './ApiManager.js'
import C from '@/constants/constants.js'

class AudioManager {
  constructor () {
    this.audio = new Audio()

    this.audio.onended = () => {
      this.nextMusic()
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
    const nextMusic = store.getters.musics[nextMusicIndex]
    const nextMusicUrl = ApiManager.getMusicSrc(nextMusic.id)

    this.play(nextMusicUrl)
    store.dispatch('setCurrentMusic', nextMusic)
  }

  prevMusic () {
    const musicMode = store.getters.musicMode
    const prevMusicIndex = this.getPrevMusicIndex(musicMode)
    const prevMusic = store.getters.musics[prevMusicIndex]
    const prevMusicUrl = ApiManager.getMusicSrc(prevMusic.id)

    this.play(prevMusicUrl)
    store.dispatch('setCurrentMusic', prevMusic)
  }

  getNextMusicIndex (musicMode) {
    const currentMusicIndex = store.getters.musics.findIndex(music => music.id === store.getters.currentMusic.id)

    switch (musicMode) {
      case C.NORMAL_MODE:
        return currentMusicIndex + 1 >= store.getters.musics.length ? 0 : currentMusicIndex + 1
      case C.SHUFFLE_MODE:
        return Math.floor(Math.random() * store.getters.musics.length)
      case C.REPEAT_MODE:
        return currentMusicIndex
    }
  }

  getPrevMusicIndex (musicMode) {
    const currentMusicIndex = store.getters.musics.findIndex(music => music.id === store.getters.currentMusic.id)

    switch (musicMode) {
      case C.NORMAL_MODE:
        return currentMusicIndex - 1 < 0 ? store.getters.musics.length - 1 : currentMusicIndex - 1
      case C.SHUFFLE_MODE:
        return Math.floor(Math.random() * store.getters.musics.length)
      case C.REPEAT_MODE:
        return currentMusicIndex
    }
  }
}

export default new AudioManager()
