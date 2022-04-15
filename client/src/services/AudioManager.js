class AudioManager {
  audio = new Audio()
  loadedMusic = null
  playStatus = false
  playMode = 'list'

  getAudio () {
    return this.audio
  }

  setAudio (audio) {
    this.audio = audio
  }

  play () {
    this.audio.play()
  }

  pause () {
    this.audio.pause()
  }

  load () {
    this.audio.load()
  }

  getAudioSrc () {
    return this.audio.src
  }

  setAudioSrc (src) {
    this.audio.src = src
  }

  getLoadedMusic () {
    return this.loadedMusic
  }

  setLoadedMusic (music) {
    this.loadedMusic = music
  }

  getPlayStatus () {
    return this.playStatus
  }

  setPlayStatus (status) {
    this.playStatus = status
  }

  getPlayMode () {
    return this.playMode
  }

  setPlayMode (mode) {
    this.playMode = mode
  }

  getCurrentTime () {
    return this.audio.currentTime
  }

  setCurrentTime (time) {
    this.audio.currentTime = time
  }
}

export default new AudioManager()
