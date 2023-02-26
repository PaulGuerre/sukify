<template>
  <section>
    <v-row no-gutters justify="center">
      <playlist v-for="playlist in playlists" :key="playlist" :playlist="playlist" />
    </v-row>
    <add-playlist />
  </section>
</template>

<script>
import Playlist from '@/components/playlist/Playlist.vue'
import AddPlaylist from '@/components/playlist/AddPlaylist.vue'
import ApiManager from '@/services/ApiManager'

export default {
  name: 'PlaylistsView',
  components: {
    Playlist,
    AddPlaylist
  },
  computed: {
    playlists () {
      return this.$store.getters.playlists
    }
  },
  mounted () {
    ApiManager.getPlaylists().then(response => {
      this.$store.dispatch('setPlaylists', response.data)
    })
  }
}
</script>
