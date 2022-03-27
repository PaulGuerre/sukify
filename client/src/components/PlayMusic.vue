<template>
  <button v-if="playStatus === id" class="btn btn-success" id="playButton" type="button" @click="pause()"><i  class="fas fa-pause"></i></button>
  <button v-else class="btn btn-success" id="playButton" type="button" @click="play(id)"><i  class="fas fa-play"></i></button>
</template>

<script>
export default {
  name: 'PlayMusic',
  props: ['id', 'playStatus'],
  methods: {
    play (id) {
      this.$emit('play', id)
    },
    pause () {
      this.$emit('pause')
    }
  }
}
</script>
