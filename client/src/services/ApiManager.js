import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'

class ApiManager {
  getMusics () {
    return axios.get('musics')
  }

  getVideoID (id) {
    return axios.get('musics/' + id + '/videoID')
  }

  addMusic (music) {
    return axios.post('musics', music)
  }

  removeMusic (id) {
    return axios.delete('musics/' + id)
  }

  updateMusic (music) {
    return axios.put('musics/' + music.id, { title: music.title, videoID: music.videoID })
  }
}

export default new ApiManager()
