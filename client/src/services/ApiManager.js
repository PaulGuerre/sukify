import axios from 'axios'

class ApiManager {
  baseURL = 'http://localhost:3000/'

  getMusics () {
    return axios.get(this.baseURL + 'musics')
  }

  getMusic (id) {
    return axios.get(this.baseURL + 'musics/' + id)
  }

  getVideoID (id) {
    return axios.get(this.baseURL + 'musics/' + id + '/videoID')
  }

  addMusic (music) {
    return axios.post(this.baseURL + 'musics', music)
  }

  removeMusic (id) {
    return axios.delete(this.baseURL + 'musics/' + id)
  }

  updateMusic (music) {
    return axios.put(this.baseURL + 'musics/' + music.id, { title: music.title, videoID: music.videoID })
  }

  getMusicSrc (id) {
    return this.baseURL + 'musics/' + id + '/src'
  }

  getPlaylists () {
    return axios.get(this.baseURL + 'playlists')
  }

  getPlaylist (id) {
    return axios.get(this.baseURL + 'playlists/' + id)
  }

  addPlaylist (playlist) {
    return axios.post(this.baseURL + 'playlists', playlist)
  }

  getPlaylistMusics (id) {
    return axios.get(this.baseURL + 'playlists/' + id + '/musics')
  }

  addMusicToPlaylist (musicId, playlistId) {
    return axios.post(this.baseURL + 'playlists/' + playlistId, { musicId: musicId })
  }

  removePlaylist (id) {
    return axios.delete(this.baseURL + 'playlists/' + id)
  }

  editPlaylist (playlist) {
    return axios.put(this.baseURL + 'playlists/' + playlist.id, { name: playlist.name })
  }

  removePlaylistMusic (musicId, playlistId) {
    return axios.delete(this.baseURL + 'playlists/' + playlistId + '/musics/' + musicId)
  }

  compareCredentials (username, password) {
    console.log(username, password)
    return axios.post(this.baseURL + 'login', { username: username, password: password })
  }
}

export default new ApiManager()
