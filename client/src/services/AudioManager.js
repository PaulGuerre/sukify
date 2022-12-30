import store from '../store/store.js'
import ApiManager from './ApiManager.js'

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
  }

  pause () {
    this.audio.pause()
  }

  nextMusic () {
    const currentMusicIndex = store.getters.musics.findIndex(music => music.id === store.getters.currentMusic.id)
    const nextMusicIndex = currentMusicIndex + 1 >= store.getters.musics.length
      ? 0
      : currentMusicIndex + 1

    const nextMusic = store.getters.musics[nextMusicIndex]
    const nextMusicUrl = ApiManager.getMusicSrc(nextMusic.id)

    this.play(nextMusicUrl)
    store.dispatch('setCurrentMusic', nextMusic)
  }

  prevMusic () {
    const currentMusicIndex = store.getters.musics.findIndex(music => music.id === store.getters.currentMusic.id)
    const prevMusicIndex = currentMusicIndex - 1 < 0
      ? store.getters.musics.length - 1
      : currentMusicIndex - 1

    const prevMusic = store.getters.musics[prevMusicIndex]
    const prevMusicUrl = ApiManager.getMusicSrc(prevMusic.id)

    this.play(prevMusicUrl)
    store.dispatch('setCurrentMusic', prevMusic)
  }
}

export default new AudioManager()
