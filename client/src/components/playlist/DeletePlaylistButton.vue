<template>
  <font-awesome-icon icon="fa-solid fa-trash" class="delete-playlist-icon" @click="deletePlaylist" />
</template>

<script>
import ApiManager from '@/services/ApiManager'

export default {
  name: 'DeletePlaylistButton',
  props: { playlistId: Number },
  computed: {
    playlists () {
      return this.$store.getters.playlists
    }
  },
  methods: {
    deletePlaylist () {
      ApiManager.deletePlaylist(this.playlistId)
      this.$store.dispatch('deletePlaylist', this.playlistId)
    }
  }
}
</script>

<style scoped>
.delete-playlist-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 5px;
  padding-bottom: 0;
}

.delete-playlist-icon:hover {
  color: #ff5252;
}
</style>
