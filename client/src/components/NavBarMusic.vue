<template>
  <nav class="navbar navbar-expand-sm fixed-top bg-success">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand text-light">Sukify</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="text-light"><i class="fas fa-sliders-h"></i></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="container-fluid justify-content-start">
          <button class="btn bg-success btn-link text-light border-0" @click="updateShow(false)">Playlists</button>
          <button class="btn bg-success btn-link text-light border-0" @click="updateShow(true)">Musics</button>
        </div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" :aria-valuenow="currentTime" aria-valuemin="0" aria-valuemax="100" :style="'width: ' + currentTime + '%'" ></div>
        </div>&nbsp;
        <div class="d-flex btn-group btn-group-sm" role="group">
          <button class="btn btn-light text-success" type="button" @click="previousMusic"><i class="fas fa-angle-double-left"></i></button>&nbsp;
          <pause-music v-if="playStatus" class="btn-light text-success"
            :audio="audio" v-on:pause="pauseMusic"
          />&nbsp;
          <play-music v-else class="btn-light text-success"
            :id="loadedMusic"
            :audio="audio" v-on:play="playMusic(loadedMusic)"
          />&nbsp;
          <button class="btn btn-light text-success" type="button" @click="nextMusic"><i class="fas fa-angle-double-right"></i></button>&nbsp;
          <button v-if="playMode !== 'repeat'" class="btn btn-light text-success" type="button" @click="repeatMode"><i class="fas fa-redo"></i></button>&nbsp;
          <button v-else class="btn btn-success text-light border border-light" type="button" @click="repeatMode"><i class="fas fa-redo"></i></button>&nbsp;
          <button v-if="playMode !== 'random'" class="btn btn-light text-success" type="button" @click="randomMode"><i class="fas fa-random"></i></button>
          <button v-else class="btn btn-success text-light border border-light" type="button" @click="randomMode"><i class="fas fa-random"></i></button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import PlayMusic from '@/components/MusicButtons/PlayMusic.vue'
import PauseMusic from '@/components/MusicButtons/PauseMusic.vue'

export default {
  name: 'NavBarMusic',
  props: ['loadedMusic', 'playStatus', 'audio', 'playMode', 'loadedPlaylist', 'showMusic'],
  components: {
    PlayMusic,
    PauseMusic
  },
  data () {
    return {
      currentTime: 0
    }
  },
  methods: {
    playMusic (id) {
      if (!this.showMusic && this.loadedPlaylist === null && this.loadedMusic === null) {
        this.$emit('playPlaylist', id)
      } else {
        this.$emit('play', id)
      }
    },
    pauseMusic () {
      this.$emit('pause')
    },
    repeatMode () {
      this.$emit('repeat')
    },
    randomMode () {
      this.$emit('random')
    },
    nextMusic () {
      this.$emit('next')
    },
    previousMusic () {
      this.$emit('previous')
    },
    updateShow (show) {
      this.$emit('updateShow', show)
    }
  },
  mounted () {
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = (this.audio.currentTime * 100) / this.audio.duration
    })
  }
}
</script>

<style>
.progress {
  width: 100%;
  margin-right: 2%;
  margin-left: 2%;
}
</style>
