import { createStore } from 'vuex'
import C from '../constants/constants'

export default createStore({
  state: {
    music: {
      musicMode: C.NORMAL_MODE,
      playState: false,
      currentMusic: null,
      musics: [],
      musicTime: 0,
      isMobile: window.innerWidth < 768
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
    },
    setMusicTime (state, musicTime) {
      state.music.musicTime = musicTime
    },
    setIsMobile (state, isMobile) {
      state.music.isMobile = isMobile
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
    },
    setMusicTime ({ commit }, musicTime) {
      commit('setMusicTime', musicTime)
    },
    setIsMobile ({ commit }, isMobile) {
      commit('setIsMobile', isMobile)
    }
  },
  getters: {
    musicMode: state => state.music.musicMode,
    playState: state => state.music.playState,
    currentMusic: state => state.music.currentMusic,
    musics: state => state.music.musics,
    musicTime: state => state.music.musicTime,
    isMobile: state => state.music.isMobile
  }
})
