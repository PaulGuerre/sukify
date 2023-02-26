import axios from 'axios'

class ApiManager {
  // baseURL = '/api/'
  baseURL = 'http://localhost:3000/api/'

  /* Musics */
  getMusics () {
    return axios.get(this.baseURL + 'musics', { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  getMusicSrc (id) {
    // return window.location.origin + this.baseURL + 'musics/' + id + '/src'
    return this.baseURL + 'musics/' + id + '/src'
  }

  addMusic (musicTitle) {
    return axios.post(this.baseURL + 'musics', { title: musicTitle }, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  deleteMusic (id) {
    return axios.delete(this.baseURL + 'musics/' + id, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  /* Playlists */
  getPlaylists () {
    return axios.get(this.baseURL + 'playlists', { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  addPlaylist (playlist) {
    return axios.post(this.baseURL + 'playlists', { name: playlist }, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  deletePlaylist (id) {
    return axios.delete(this.baseURL + 'playlists/' + id, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  getPlaylistMusics (id) {
    return axios.get(this.baseURL + 'playlists/' + id + '/musics', { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  addMusicToPlaylist (musicId, playlistId) {
    return axios.post(this.baseURL + 'playlists/' + playlistId, { musicId: musicId }, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  removePlaylistMusic (musicId, playlistId) {
    return axios.delete(this.baseURL + 'playlists/' + playlistId + '/musics/' + musicId, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  addSpotifyPlaylist (playlistUrl) {
    return axios.post(this.baseURL + 'spotifyPlaylist', { url: playlistUrl }, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  /* Users */
  compareCredentials (username, password) {
    return axios.post(this.baseURL + 'login', { username: username, password: password })
  }

  compareToken (token) {
    return axios.post(this.baseURL + 'token', { token: token })
  }
}

export default new ApiManager()
