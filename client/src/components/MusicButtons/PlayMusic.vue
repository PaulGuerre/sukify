<template>
  <button class="btn" type="button" @click="playMusic(id)"><i  class="fas fa-play"></i></button>
</template>

<script>
export default {
  name: 'PlayMusic',
  props: ['id', 'audio'],
  methods: {
    playMusic (id) {
      this.$emit('play', id)
    }
  }
}
</script>
