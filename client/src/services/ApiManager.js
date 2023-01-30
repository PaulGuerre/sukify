import axios from 'axios'

class ApiManager {
  // baseURL = '/api/'
  baseURL = 'http://localhost:3000/api/'

  getMusics () {
    return axios.get(this.baseURL + 'musics', { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  getMusic (id) {
    return axios.get(this.baseURL + 'musics/' + id, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  getVideoID (id) {
    return axios.get(this.baseURL + 'musics/' + id + '/videoID', { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  addMusic (music) {
    return axios.post(this.baseURL + 'musics', music, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  deleteMusic (id) {
    return axios.delete(this.baseURL + 'musics/' + id, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  updateMusic (music) {
    return axios.put(this.baseURL + 'musics/' + music.id, { title: music.title, videoID: music.videoID }, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  getMusicSrc (id) {
    // return window.location.origin + this.baseURL + 'musics/' + id + '/src'
    return this.baseURL + 'musics/' + id + '/src'
  }

  getPlaylists () {
    return axios.get(this.baseURL + 'playlists', { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  getPlaylist (id) {
    return axios.get(this.baseURL + 'playlists/' + id, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  addPlaylist (playlist) {
    return axios.post(this.baseURL + 'playlists', playlist, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  getPlaylistMusics (id) {
    return axios.get(this.baseURL + 'playlists/' + id + '/musics', { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  addMusicToPlaylist (musicId, playlistId) {
    return axios.post(this.baseURL + 'playlists/' + playlistId, { musicId: musicId }, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  removePlaylist (id) {
    return axios.delete(this.baseURL + 'playlists/' + id, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  editPlaylist (playlist) {
    return axios.put(this.baseURL + 'playlists/' + playlist.id, { name: playlist.name }, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  removePlaylistMusic (musicId, playlistId) {
    return axios.delete(this.baseURL + 'playlists/' + playlistId + '/musics/' + musicId, { headers: { Authorization: sessionStorage.getItem('token') } })
  }

  compareCredentials (username, password) {
    return axios.post(this.baseURL + 'login', { username: username, password: password })
  }

  compareToken (token) {
    return axios.post(this.baseURL + 'token', { token: token })
  }

  getYoutubeApiKey () {
    return axios.get(this.baseURL + 'youtubeApiKey', { headers: { Authorization: sessionStorage.getItem('token') } })
  }
}

export default new ApiManager()
