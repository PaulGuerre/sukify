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
        <div class="d-flex btn-group btn-group-sm" role="group">
          <button class="btn btn-light text-success" type="button" @click="musicAction('previous')"><i class="fas fa-angle-double-left"></i></button>&nbsp;
          <pause-music v-if="playStatus" class="btn-light text-success"
            :audio="audio" @pause="pauseMusic()"
          />&nbsp;
          <play-music v-else class="btn-light text-success"
            :id="loadedMusic"
            :audio="audio" @play="playMusic(loadedMusic)"
          />&nbsp;
          <button class="btn btn-light text-success" type="button" @click="musicAction('next')"><i class="fas fa-angle-double-right"></i></button>&nbsp;
          <button v-if="playMode !== 'repeat'" class="btn btn-light text-success" type="button" @click="updateMode('repeat')"><i class="fas fa-redo"></i></button>&nbsp;
          <button v-else class="btn btn-success text-light border border-light" type="button" @click="updateMode('list')"><i class="fas fa-redo"></i></button>&nbsp;
          <button v-if="playMode !== 'random'" class="btn btn-light text-success" type="button" @click="updateMode('random')"><i class="fas fa-random"></i></button>
          <button v-else class="btn btn-success text-light border border-light" type="button" @click="updateMode('list')"><i class="fas fa-random"></i></button>
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
  props: ['audio', 'loadedMusic', 'loadedPlaylist', 'playStatus', 'playMode', 'showMusic'],
  components: {
    PlayMusic,
    PauseMusic
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
    updateMode (mode) {
      this.$emit('updateMode', mode)
    },
    musicAction (action) {
      this.$emit('musicAction', action)
    },
    updateShow (show) {
      this.$emit('updateShow', show)
    }
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
