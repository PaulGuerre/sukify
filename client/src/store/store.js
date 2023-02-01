import { createStore } from 'vuex'
import C from '../constants/constants'

export default createStore({
  state: {
    music: {
      musicMode: C.NORMAL_MODE,
      playState: false,
      currentMusic: null,
      musics: []
    }
  },
  mutations: {
    setMusicMode (state, musicMode) {
      state.music.musicMode = musicMode
    },
    setPlayState (state, playState) {
      state.music.playState = playState
    },
    setCurrentMusic (state, music) {
      state.music.currentMusic = music
    },
    setMusics (state, musics) {
      state.music.musics = musics
    },
    deleteMusic (state, musicId) {
      state.music.musics = state.music.musics.filter(music => music.id !== musicId)
    }
  },
  actions: {
    setMusicMode ({ commit }, musicMode) {
      commit('setMusicMode', musicMode)
    },
    setPlayState ({ commit }, playState) {
      commit('setPlayState', playState)
    },
    setCurrentMusic ({ commit }, music) {
      commit('setCurrentMusic', music)
    },
    setMusics ({ commit }, musics) {
      commit('setMusics', musics)
    },
    deleteMusic ({ commit }, musicId) {
      commit('deleteMusic', musicId)
    }
  },
  getters: {
    musicMode: state => state.music.musicMode,
    playState: state => state.music.playState,
    currentMusic: state => state.music.currentMusic,
    musics: state => state.music.musics
  }
})
