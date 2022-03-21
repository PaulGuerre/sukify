<template>
  <div id="tasks">
    <audio id="audio" :src="this.music" type="audio/mp3"></audio>
    <button @click="musicPlay()">Play Music</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      music: [],
      errors: []
    }
  },
  methods: {
    musicPlay () {
      const audio = new Audio('http://localhost:3000/play')
      audio.play()
    }
  }
}
</script>
