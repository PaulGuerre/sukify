<template>
  <section>
    <playlist v-for="playlist in playlists" :key="playlist" :playlist="playlist" />
    <add-playlist />
  </section>
</template>

<script>
import Playlist from '@/components/playlist/Playlist.vue'
import AddPlaylist from '@/components/playlist/AddPlaylist.vue'

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
  }
}
</script>
