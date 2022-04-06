<template>
  <nav class="navbar bg-success">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand text-light">Home</router-link>
    <form class="d-flex">
      <PlayMusic class="bg-light text-success" :id="currentMusic" :audio="audio" v-on:play="play($event)" v-on:pause="pause()" :playStatus="playStatus" />
      <RepeatMusic :playMode="playMode" v-on:repeat="repeatMode($event)" />
      <RandomMusic :playMode="playMode" v-on:random="randomMode($event)" />
    </form>
  </div>
</nav>
</template>

<script>
import PlayMusic from './PlayMusic.vue'
import RepeatMusic from './RepeatMusic.vue'
import RandomMusic from './RandomMusic.vue'

export default {
  props: ['currentMusic', 'audio', 'playStatus', 'playMode'],
  name: 'NavBarMusic',
  components: {
    PlayMusic,
    RepeatMusic,
    RandomMusic
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
    }
  }
}
</script>

<style>
.btn {
    margin-right: 2%;
}
</style>
