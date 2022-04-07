<template>
  <nav class="navbar navbar-expand-sm fixed-top bg-success">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand text-light">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="text-light"><i class="fas fa-sliders-h"></i></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <router-link to="/playlists" class="navbar-nav me-auto nav-link text-light">Playlists</router-link>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" :aria-valuenow="currentTime" aria-valuemin="0" aria-valuemax="100" :style="'width: ' + currentTime + '%'" ></div>
        </div>&nbsp;
        <div v-if="connect" class="d-flex btn-group btn-group-sm" role="group">
          <PreviousMusicButton v-on:previous="previousMusic" />&nbsp;
          <PlayMusic class="bg-light text-success" :id="currentMusic" :audio="audio" v-on:play="play($event)" v-on:pause="pause()" :playStatus="playStatus" />&nbsp;
          <NextMusicButton v-on:next="nextMusic" />&nbsp;
          <RepeatMusic :playMode="playMode" v-on:repeat="repeatMode($event)" />&nbsp;
          <RandomMusic :playMode="playMode" v-on:random="randomMode($event)" />
        </div>
        <div v-else class="d-flex btn-group btn-group-sm placeholder-wave">
          <button class="btn btn-light disabled placeholder"><i class="fas fa-angle-double-left"></i></button>&nbsp;
          <button class="btn btn-light disabled placeholder"><i class="fas fa-play"></i></button>&nbsp;
          <button class="btn btn-light disabled placeholder"><i class="fas fa-angle-double-right"></i></button>&nbsp;
          <button class="btn btn-light disabled placeholder"><i class="fas fa-redo"></i></button>&nbsp;
          <button class="btn btn-light disabled placeholder"><i class="fas fa-random"></i></button>&nbsp;
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import PlayMusic from './PlayMusic.vue'
import RepeatMusic from './RepeatMusic.vue'
import RandomMusic from './RandomMusic.vue'
import NextMusicButton from './NextMusicButton.vue'
import PreviousMusicButton from './PreviousMusicButton.vue'

export default {
  props: ['connect', 'currentMusic', 'audio', 'playStatus', 'playMode'],
  name: 'NavBarMusic',
  components: {
    PlayMusic,
    RepeatMusic,
    RandomMusic,
    NextMusicButton,
    PreviousMusicButton
  },
  data () {
    return {
      currentTime: 0
    }
  },
  methods: {
    play (id) {
      this.$emit('play', id)
    },
    pause () {
      this.$emit('pause')
    },
    repeatMode (mode) {
      this.$emit('repeat', mode)
    },
    randomMode (mode) {
      this.$emit('random', mode)
    },
    nextMusic () {
      this.$emit('next')
    },
    previousMusic () {
      this.$emit('previous')
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
