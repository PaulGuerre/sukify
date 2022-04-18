<template>
  <div id="playlistList">
    <div class="modal fade" id="editPlaylistModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit playlist</h5>
            <button type="button" class="btn-close" id="modalCloseButton" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" v-model="playlistInput">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" @click="editPlaylist" >Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-md-3 row-cols-lg-5">
      <div class="col" v-for="playlist in playlists" :key="playlist.id">
        <div class="card border border-light">
          <div v-if="playlist.videoID === undefined"  class="placeholder-wave">
            <img src="https://i.ytimg.com/vi/xN6LFM4CkWI/mqdefault.jpg" class="card-img-top placeholder placeholder-wave">
          </div>
          <img v-else :src="'https://i.ytimg.com/vi/' + playlist.videoID + '/mqdefault.jpg'" class="card-img-top playlistCardImg">
          <div class="card-body card-img-overlay" @click="loadPlaylistMusic(playlist.id)">
            <p class="card-text text-light fs-3 text-truncate">{{ playlist.name }}</p>
          </div>
          <div class="card-footer text-center">
            <div class="btn-group btn-group-sm" role="group">
              <pause-music v-if="loadedPlaylist === playlist.id && playStatus" class="btn-success"
                :audio="audio" @pause="pauseMusic()"
              />
              <play-music v-else class="btn-success"
                :id="playlist.id"
                :audio="audio"
                @play="playMusic($event)"
              />
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editPlaylistModal" @click="modalPlaylist = playlist, playlistInput = playlist.name" ><i class="fas fa-edit"></i></button>
              <remove-button :id="playlist.id"
                :openedPlaylist="openedPlaylist"
                :showMusic="showMusic" @removePlaylist="removePlaylist($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import playMusic from '@/components/MusicButtons/PlayMusic.vue'
import pauseMusic from '@/components/MusicButtons/PauseMusic.vue'
import RemoveButton from '@/components/RemoveButton.vue'
import InfoManager from '@/services/InfoManager.js'
import ApiManager from '@/services/ApiManager.js'

export default {
  name: 'PlaylistList',
  props: ['audio', 'playlists', 'loadedPlaylist', 'playStatus', 'showMusic', 'openedPlaylist'],
  components: {
    playMusic,
    pauseMusic,
    RemoveButton
  },
  data () {
    return {
      modalPlaylist: [],
      playlistInput: ''
    }
  },
  methods: {
    playMusic (playlistId) {
      this.$emit('playPlaylist', playlistId)
    },
    pauseMusic () {
      this.$emit('pause')
    },
    removePlaylist (id) {
      this.$emit('removePlaylist', id)
    },
    loadPlaylistMusic (id) {
      this.$emit('loadPlaylistMusic', id)
    },
    editPlaylist () {
      if (this.playlistInput !== '') {
        this.modalPlaylist.name = this.playlistInput
        ApiManager.editPlaylist(this.modalPlaylist).then(response => {
          if (response.data.message === 'success') {
            this.$emit('editPlaylist', this.modalPlaylist)
            document.getElementById('modalCloseButton').click()
            this.playlistInput = ''
            InfoManager.showInfo('Playlist edited', 'success')
          } else {
            InfoManager.showInfo('Error while updating music', 'danger')
          }
        })
      } else {
        InfoManager.showInfo('Name can\'t be empty', 'danger')
      }
    }
  }
}
</script>

<style>
.playlistCardImg {
  filter: blur(3px);
}
</style>
