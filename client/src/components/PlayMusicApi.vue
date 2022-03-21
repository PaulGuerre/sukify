<template>
    <button class="btn btn-success" type="button" @click="play(this.id)"><i  class="fas fa-play"></i></button>
</template>

<script>
export default {
  name: 'PlayMusic',
  props: ['id'],
  methods: {
    play (id) {
      const audio = new Audio('http://localhost:3000/musics/' + id)
      audio.play()
    }
  }
}
</script>
