<template>
  <div id="addMusic">
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-body text-center">
              <button class="btn btn-success" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Downloading <bold>{{ musicInput }}</bold>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="input-group mb-3">
        <span>
          <select class="form-select border-success bg-success text-light" v-model="format">
            <option value="title">Title</option>
            <option value="url" selected>URL</option>
          </select>
        </span>
        <input type="text" class="form-control border-success text-success" placeholder="Music name" v-model="musicInput">
        <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="addMusic()"><i  class="fas fa-plus"></i></button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddMusic',
  data () {
    return {
      format: 'url',
      musicInput: '',
      errors: []
    }
  },
  methods: {
    addMusic () {
      axios.post('http://localhost:3000/musics', {
        url: 'https://www.youtube.com/watch?v=s5yRZOQ3EWI',
        title: 'El Alfa "El Jefe" x CJ x El Cherry Scom - La Mamá de la Mamá (Video Oficial)'
      })
        .then(response => {
          console.log(response.message)
          this.$router.go(0)
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  }
}
</script>

<style>
#addMusic {
  margin: 5%;
}
</style>
