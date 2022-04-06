<template>
  <nav class="navbar fixed-top bg-success" id="sex">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand text-light">Home</router-link>
      <form v-if="connect" class="d-flex">
        <div class="btn-group btn-group-sm" role="group">
          <PreviousMusicButton v-on:previous="previousMusic" />&nbsp;
          <PlayMusic class="bg-light text-success" :id="currentMusic" :audio="audio" v-on:play="play($event)" v-on:pause="pause()" :playStatus="playStatus" />&nbsp;
          <NextMusicButton v-on:next="nextMusic" />&nbsp;
          <RepeatMusic :playMode="playMode" v-on:repeat="repeatMode($event)" />&nbsp;
          <RandomMusic :playMode="playMode" v-on:random="randomMode($event)" />
        </div>
      </form>
      <form v-else class="d-flex placeholder-wave">
        <button class="btn btn-light disabled placeholder"><i class="fas fa-angle-double-left"></i></button>&nbsp;
        <button class="btn btn-light disabled placeholder"><i class="fas fa-play"></i></button>&nbsp;
        <button class="btn btn-light disabled placeholder"><i class="fas fa-angle-double-right"></i></button>&nbsp;
        <button class="btn btn-light disabled placeholder"><i class="fas fa-redo"></i></button>&nbsp;
        <button class="btn btn-light disabled placeholder"><i class="fas fa-random"></i></button>&nbsp;
      </form>
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
