import { createStore } from 'vuex'
import C from '../constants/constants'

export default createStore({
  state: {
    music: {
      musicMode: C.NORMAL_MODE,
      playState: false,
      currentMusic: null,
      currentPlaylist: null,
      musics: [],
      playlist: [],
      musicTime: 0,
      isMobile: window.innerWidth < 768,
      currentMusics: []
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
    setCurrentPlaylist (state, playlist) {
      state.music.currentPlaylist = playlist
    },
    setMusics (state, musics) {
      state.music.musics = musics
    },
    setPlaylists (state, playlists) {
      state.music.playlists = playlists
    },
    deleteMusic (state, musicId) {
      state.music.musics = state.music.musics.filter(music => music.id !== musicId)
    },
    deletePlaylist (state, playlistId) {
      state.music.playlists = state.music.playlists.filter(playlist => playlist.id !== playlistId)
    },
    setMusicTime (state, musicTime) {
      state.music.musicTime = musicTime
    },
    setIsMobile (state, isMobile) {
      state.music.isMobile = isMobile
    },
    setCurrentMusics (state, currentMusics) {
      state.music.currentMusics = currentMusics
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
    setCurrentPlaylist ({ commit }, playlist) {
      commit('setCurrentPlaylist', playlist)
    },
    setMusics ({ commit }, musics) {
      commit('setMusics', musics)
    },
    setPlaylists ({ commit }, playlists) {
      commit('setPlaylists', playlists)
    },
    deleteMusic ({ commit }, musicId) {
      commit('deleteMusic', musicId)
    },
    deletePlaylist ({ commit }, playlistId) {
      commit('deletePlaylist', playlistId)
    },
    setMusicTime ({ commit }, musicTime) {
      commit('setMusicTime', musicTime)
    },
    setIsMobile ({ commit }, isMobile) {
      commit('setIsMobile', isMobile)
    },
    setCurrentMusics ({ commit }, currentMusics) {
      commit('setCurrentMusics', currentMusics)
    }
  },
  getters: {
    musicMode: state => state.music.musicMode,
    playState: state => state.music.playState,
    currentMusic: state => state.music.currentMusic,
    currentPlaylist: state => state.music.currentPlaylist,
    musics: state => state.music.musics,
    playlists: state => state.music.playlists,
    musicTime: state => state.music.musicTime,
    isMobile: state => state.music.isMobile,
    currentMusics: state => state.music.currentMusics
  }
})
