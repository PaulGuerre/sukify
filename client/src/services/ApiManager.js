import axios from 'axios'

class ApiManager {
  getMusics () {
    return axios.get('http://localhost:3000/musics')
  }

  addMusic (music) {
    return axios.post('http://localhost:3000/musics', music)
  }

  removeMusic (id) {
    return axios.delete('http://localhost:3000/musics/' + id)
  }

  updateMusic (music) {
    return axios.put('http://localhost:3000/musics/' + music.id, { title: music.title, videoID: music.videoID })
  }
}

export default new ApiManager()
