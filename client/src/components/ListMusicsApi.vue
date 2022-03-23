<template>
  <div id="musicList">
    <div class="row row-cols-md-4 row-cols-lg-5">
      <div class="col" v-for="music in musics" :key="music.id">
        <div class="card text-center">
          <img :src="'http://localhost:3000/musics/' + music.id + '/thumbnail'" class="card-img-top">
          <div class="card-body">
            <p v-if="music.title.length < 15" class="card-text">{{ music.title }}</p>
            <p v-else class="card-text">{{ music.title.substring(0, 15) + "..." }}</p>
          </div>
          <div class="card-footer">
            <div class="btn-group" role="group">
              <button v-if="this.playStatus === music.id" class="btn btn-success" id="playButton" type="button" @click="pause(music.id)"><i  class="fas fa-pause"></i></button>
              <button v-else class="btn btn-success" id="playButton" type="button" @click="play(music.id)"><i  class="fas fa-play"></i></button>              <!--<PlayMusic :id="music.id" :audio.sync="audio" />-->
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
import RemoveMusic from '../components/RemoveMusicApi.vue'

export default {
  name: 'ListMusic',
  components: {
    RemoveMusic
  },
  data () {
    return {
      audio: new Audio(),
      connect: false,
      playStatus: null,
      musics: [],
      errors: []
    }
  },
  methods: {
    play (id) {
      if (this.audio.src !== 'http://localhost:3000/musics/' + id) {
        this.audio.src = 'http://localhost:3000/musics/' + id
        this.audio.load()
      }
      this.playStatus = this.audio.paused ? id : null
      this.audio.play()
    },
    pause (id) {
      this.playStatus = this.audio.paused ? id : null
      this.audio.pause()
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
