<template>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3" style="margin-right: 2%; margin-left: 2%;">
        <div class="col" v-for="music in $store.getters.musics" :key="music">
            <Music :currentMusic="currentMusic" :music="music"/>
        </div>
    </div>
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
