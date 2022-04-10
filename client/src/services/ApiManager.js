import axios from 'axios'

class ApiManager {
  baseURL = 'https://api.sukify.sukine.fr/'

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
}

export default new ApiManager()
