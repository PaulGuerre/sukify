<template>
  <div id="addPlaylist">
    <div class="modal fade" id="addPlaylistModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create a new playlist</h5>
            <button type="button" class="btn-close" id="buttonCloseModal" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <label>Name</label>
            <input type="text" class="form-control" placeholder="" v-model="musicInput" @keyup.enter="addPlaylist(musicInput)">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" @click="addPlaylist(musicInput)" >Create</button>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-success rounded-pill" type="button" id="addPlaylistButton" data-bs-toggle="modal" data-bs-target="#addPlaylistModal"><i  class="fas fa-plus"></i></button>
  </div>
</template>

<script>
import ErrorManager from '@/services/ErrorManager.js'

export default {
  name: 'AddMusic',
  data () {
    return {
      musicInput: ''
    }
  },
  methods: {
    addPlaylist (musicInput) {
      if (musicInput !== '') {
        const playlist = { name: musicInput }
        this.$emit('create', playlist)
        this.musicInput = ''
        document.getElementById('buttonCloseModal').click()
      } else {
        ErrorManager.showErrorMessage('Playlist name can\'t empty')
      }
    }
  }
}
</script>

<style>
#addPlaylistButton {
  position: fixed;
  right: 1%;
  top: 50%;
  opacity: 0.5;
}

#addPlaylistButton:hover {
  opacity: 1;
}
</style>
