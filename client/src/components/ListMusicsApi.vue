<template>
  <div id="musicList">
    <div class="row row-cols-md-4 row-cols-lg-6">
      <div class="col" v-for="music in musics" :key="music.id">
        <div class="card text-center">
          <img :src="'http://localhost:3000/musics/' + music.id + '/thumbnail'" class="card-img-top">
          <div class="card-body">
            <p v-if="music.title.length < 50" class="card-text">{{ music.title }}</p>
            <p v-else class="card-text">{{ music.title.substring(0, 50) + "..." }}</p>
          </div>
          <div class="card-footer">
            <div class="btn-group" role="group">
              <PlayMusic :id="music.id" />
              <button class="btn btn-warning">Edit</button>
              <RemoveMusic :id="music.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PlayMusic from '../components/PlayMusicApi.vue'
import RemoveMusic from '../components/RemoveMusicApi.vue'

export default {
  name: 'ListMusic',
  components: {
    PlayMusic,
    RemoveMusic
  },
  data () {
    return {
      connect: false,
      musics: [],
      errors: []
    }
  },
  methods: {
    getThumbnail (id) {
      axios.get('http://localhost:3000/musics/' + id + '/thumbnail')
        .then(reponse => {
          console.log(reponse)
          return reponse
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  },
  created () {
    axios.get('http://localhost:3000/musics')
      .then(response => {
        this.connect = true
        this.musics = response.data
      })
      .catch(e => {
        this.error.push(e)
      })
  }
}
</script>

<style>
#musicList {
    background-color: darkslategray;
}

#listGroupItems {
    background-color: darkslategray;
    border-color: darkslategray;
}

.card {
  margin: 5%
}
</style>
