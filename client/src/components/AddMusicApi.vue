<template>
  <div id="addMusic">
      <div class="input-group mb-3">
        <span>
          <select class="form-select border-success bg-success text-light" v-model="format">
            <option value="title">Title</option>
            <option value="url" selected>URL</option>
          </select>
        </span>
        <input type="text" class="form-control border-success text-success" placeholder="Music name" v-model="musicInput">
        <button class="btn btn-success" type="button" @click="addMusic()"><i  class="fas fa-plus"></i></button>
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
        url: 'https://youtu.be/y8trd3gjJt0',
        title: 'Farruko - Pepas (Official Video)'
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
