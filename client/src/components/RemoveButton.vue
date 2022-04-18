<template>
  <button class="btn btn-danger" type="button" @click="remove"><i  class="fas fa-trash"></i></button>
</template>

<script>
import InfoManager from '@/services/InfoManager.js'

export default {
  name: 'removeButton',
  props: ['id', 'openedPlaylist', 'showMusic'],
  methods: {
    remove () {
      if (this.openedPlaylist === null) {
        this.$emit('removeMusic', this.id)
      } else if (this.openedPlaylist !== null && this.showMusic) {
        this.$emit('removePlaylistMusic', { musicId: this.id, playlistId: this.openedPlaylist })
      } else if (this.openedPlaylist !== null && !this.showMusic) {
        this.$emit('removePlaylist', this.id)
      } else {
        InfoManager.showInfo('Error while removing ' + this.openedPlaylist === null ? 'music' : 'playlist', 'danger')
      }
    }
  }
}
</script>
