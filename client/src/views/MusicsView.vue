<template>
  <Music v-for="music in $store.getters.musics" :key="music" :music="music" />
</template>

<script>
import Music from '@/components/Music.vue'
import ApiManager from '@/services/ApiManager'

export default {
  name: 'MusicList',
  components: {
    Music
  },
  mounted () {
    ApiManager.getMusics().then(response => {
      this.$store.dispatch('setMusics', response.data)
      this.$store.dispatch('setCurrentMusic', response.data.at(0))
    })
  }
}
</script>
