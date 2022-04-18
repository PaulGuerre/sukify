<template>
  <button class="btn btn-danger" type="button" @click="remove"><i  class="fas fa-trash"></i></button>
</template>

<script>
import InfoManager from '@/services/InfoManager.js'
import ApiManager from '@/services/ApiManager.js'

export default {
  name: 'removeButton',
  props: ['id', 'openedPlaylist', 'showMusic'],
  methods: {
    remove () {
      if (this.openedPlaylist === null && this.showMusic) {
        ApiManager.removeMusic(this.id).then(response => {
          if (response.data.message === 'success') {
            this.$emit('removeMusic', this.id)
            InfoManager.showInfo('Music removed', 'success')
          } else {
            InfoManager.showInfo('Error while removing music', 'danger')
          }
        })
      } else if (this.openedPlaylist !== null && this.showMusic) {
        ApiManager.removePlaylistMusic(this.id, this.openedPlaylist).then(response => {
          if (response.data.message === 'success') {
            this.$emit('removeMusic', this.id)
            InfoManager.showInfo('Playlist\'s music removed', 'success')
          } else {
            InfoManager.showInfo('Error while removing playlist music', 'danger')
          }
        })
      } else if (this.openedPlaylist === null && !this.showMusic) {
        ApiManager.removePlaylist(this.id).then(response => {
          if (response.data.message === 'success') {
            this.$emit('removePlaylist', this.id)
            InfoManager.showInfo('Playlist removed', 'success')
          } else {
            InfoManager.showInfo('Error while removing playlist', 'danger')
          }
        })
      } else {
        InfoManager.showInfo('Error while removing ' + this.openedPlaylist === null ? 'music' : 'playlist', 'danger')
      }
    }
  }
}
</script>
