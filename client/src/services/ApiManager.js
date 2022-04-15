import axios from 'axios'

class ApiManager {
  baseURL = 'http://localhost:3000/'

  getMusics () {
    return axios.get(this.baseURL + 'musics')
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
    return this.baseURL + 'musics/' + id
  }

  getPlaylists () {
    return axios.get(this.baseURL + 'playlists')
  }

  addPlaylist (playlists) {
    return axios.post(this.baseURL + 'playlists', playlists)
  }
}

export default new ApiManager()
