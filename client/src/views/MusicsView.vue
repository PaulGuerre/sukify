<template>
  <section>
    <music v-for="music in musics" :key="music" :music="music" />
    <add-music />
  </section>
</template>

<script>
import Music from '@/components/music/Music.vue'
import AddMusic from '@/components/music/AddMusic.vue'
import ApiManager from '@/services/ApiManager'

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
  },
  methods: {
    getMusics () {
      const playlistId = this.$route.params.id
      const apiMusics = playlistId ? ApiManager.getPlaylistMusics(playlistId) : ApiManager.getMusics()

      apiMusics.then(response => {
        this.$store.dispatch('setMusics', response.data)
        this.$store.dispatch('setCurrentMusics', response.data)
        this.$store.dispatch('setCurrentMusic', response.data.at(0))
      })
    }
  },
  watch: {
    $route: function (to, from) {
      this.getMusics()
    }
  },
  mounted () {
    this.getMusics()
  }
}
</script>
