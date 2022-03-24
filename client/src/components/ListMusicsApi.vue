<template>
  <div id="musicList">
    <div v-if="connect" class="row row-cols-md-4 row-cols-lg-5">
      <div class="col" v-for="music in musics" :key="music.id">
        <div class="card">
          <img :src="'http://localhost:3000/musics/' + music.id + '/thumbnail'" class="card-img-top">
          <div class="card-body">
            <p v-if="music.title.length < 30" class="card-text">{{ music.title }}</p>
            <p v-else class="card-text">{{ music.title.substring(0, 30) + ".." }}</p>
          </div>
          <div class="card-footer text-center">
            <div class="btn-group" role="group">
              <button v-if="this.playStatus === music.id" class="btn btn-success" id="playButton" type="button" @click="pause(music.id)"><i  class="fas fa-pause"></i></button>
              <button v-else class="btn btn-success" id="playButton" type="button" @click="play(music.id)"><i  class="fas fa-play"></i></button>              <!--<PlayMusic :id="music.id" :audio.sync="audio" />-->
              <button class="btn btn-warning" type="button">Edit</button>
              <RemoveMusic :id="music.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row row-cols-md-4 row-cols-lg-5">
      <div class="col" v-for="index in 10" :key="index">
        <div class="card placeholder-wave">
          <img src="../assets/placeholder.png" class="card-img-top placeholder">
          <div class="card-body placeholder-wave">
            <span class="placeholder col-6 placeholder-lg"></span>
          </div>
          <div class="card-footer text-center placeholder-wave">
            <div class="btn-group col-10" role="group">
              <button class="btn btn-success disabled placeholder" type="button"></button>
              <button class="btn btn-warning disabled placeholder" type="button"></button>
              <button class="btn btn-danger disabled placeholder" type="button"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="shuffle" class="bg-dark">
      <ul class="nav nav-pills nav-fill">
        <li class="nav-item placeholder-wave">
          <img v-if="currentMusic !== null" :src="'http://localhost:3000/musics/' + currentMusic + '/thumbnail'" class="img-thumbnail bg-dark border-dark" id="shuffleImg" />
          <img v-else src="../assets/shufflePlaceholder.png" class="img-thumbnail bg-dark border-dark placeholder" id="shuffleImg" />
        </li>
        <li class="nav-item">
          <button class="btn btn-success border-dark border-4 rounded-3" id="shufflePlayButton" type="button"><i class="fas fa-play"></i></button>
        </li>
        <li class="nav-item">
          <button class="btn btn-success border-dark border-4 rounded-3" id="playingStyle" type="button"><i class="fas fa-undo"></i></button>
        </li>
      </ul>
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
      currentMusic: null,
      musics: [],
      errors: []
    }
  },
  methods: {
    play (id) {
      if (this.audio.src !== 'http://localhost:3000/musics/' + id) {
        this.currentMusic = id
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

#shuffle {
  position: fixed;
  bottom: 0;
  width: 100%;
}

#shuffleImg {
  width: 100px;
  float: left;
}

#playingStyle {
  height: 100%;
  width: 100px;
  float: right;
}

#shufflePlayButton {
  height: 100%;
  width: 100px;
}

.card {
  margin: 5%;
}
</style>
