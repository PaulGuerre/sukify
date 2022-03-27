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
}

export default new ApiManager()
