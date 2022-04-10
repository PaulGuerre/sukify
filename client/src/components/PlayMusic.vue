<template>
  <button class="btn" type="button" @click="play(id)"><i  class="fas fa-play"></i></button>
</template>

<script>
export default {
  name: 'PlayMusic',
  props: ['id', 'audio'],
  methods: {
    play (id) {
      this.$emit('play', id)
    }
  }
}
</script>
