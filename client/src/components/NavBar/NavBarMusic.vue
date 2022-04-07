<template>
  <nav class="navbar navbar-expand-sm fixed-top bg-success">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand text-light">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="text-light"><i class="fas fa-sliders-h"></i></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <router-link to="/playlists" class="navbar-nav me-auto nav-link text-light">Playlists</router-link>
        <MusicStatus :connect="connect" :audio="audio" />
        <div v-if="connect" class="d-flex btn-group btn-group-sm" role="group">
          <PreviousMusicButton v-on:previous="previousMusic" />&nbsp;
          <PlayMusic class="bg-light text-success" :id="currentMusic" :playStatus="playStatus" :audio="audio" v-on:play="play($event)" v-on:pause="pause()" />&nbsp;
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
import PlayMusic from '@/components/Utils/PlayMusic.vue'
import RepeatMusic from '@/components/NavBar/RepeatMusic.vue'
import RandomMusic from '@/components/NavBar/RandomMusic.vue'
import NextMusicButton from '@/components/NavBar/NextMusicButton.vue'
import PreviousMusicButton from '@/components/NavBar/PreviousMusicButton.vue'
import MusicStatus from '@/components/NavBar/MusicStatus.vue'

export default {
  name: 'NavBarMusic',
  props: ['connect', 'currentMusic', 'audio', 'playStatus', 'playMode'],
  components: {
    PlayMusic,
    RepeatMusic,
    RandomMusic,
    NextMusicButton,
    PreviousMusicButton,
    MusicStatus
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
  }
}
</script>
