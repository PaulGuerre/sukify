<template>
  <div class="home">
    <PlayMusicApi />
    <AddMusicApi />
  </div>
</template>

<script>
import PlayMusicApi from '../components/PlayMusicApi.vue'
import AddMusicApi from '../components/AddMusicApi.vue'

export default {
  name: 'HomeView',
  components: {
    PlayMusicApi,
    AddMusicApi
  }
}
</script>
