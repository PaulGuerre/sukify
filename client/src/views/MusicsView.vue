<template>
  <section>
    <music v-for="music in musics" :key="music" :music="music" />
    <add-music />
  </section>
</template>

<script>
import Music from '@/components/music/Music.vue'
import AddMusic from '@/components/music/AddMusic.vue'

export default {
  name: 'MusicsView',
  components: {
    Music,
    AddMusic
  },
  computed: {
    musics () {
      return this.$store.getters.musics
    }
  }
}
</script>
