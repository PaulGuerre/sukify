<template>
  <div id="playlistList">
    <div class="modal fade" id="editPlaylistModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-dark">
          <div class="modal-header border-dark">
            <h5 class="modal-title text-success">Edit playlist</h5>
            <button type="button" class="btn-close btn-close-white" id="modalCloseButton" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" v-model="playlistInput">
          </div>
          <div class="modal-footer border-dark justify-content-around">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" @click="editPlaylist" >Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="playlists.length > 0" class="row row-cols-1 row-cols-md-3 row-cols-lg-6" style="margin-right: 2%; margin-left: 2%;">
      <div class="col" v-for="playlist in playlists" :key="playlist.id">
        <div class="card text-light mb-4 shadow-lg" style="background-color: #505050">
          <img v-if="playlist.videoID === undefined" src="https://i.ytimg.com/vi/xN6LFM4CkWI/mqdefault.jpg" class="card-img-top placeholder placeholder-wave">
          <img v-else :src="'https://i.ytimg.com/vi/' + playlist.videoID + '/mqdefault.jpg'" class="card-img-top">
          <div class="card-img-overlay text-center d-flex flex-column justify-content-between" @click="loadPlaylistMusic(playlist.id)">
            <h5 class="card-title fs-3 fw-bold text-truncate text-center">{{ playlist.name }}</h5>
            <div class="btn-group btn-group-sm shadow-none" role="group">
              <pause-music v-if="loadedPlaylist === playlist.id && playStatus" class="text-success bg-transparent"
                :audio="audio" @pause="pauseMusic()"
              />
              <play-music v-else class="text-success bg-transparent"
                :id="playlist.id"
                :audio="audio" @play="playMusic($event)"
              />
              <button type="button" class="btn text-success bg-transparent" data-bs-toggle="modal" data-bs-target="#editPlaylistModal" @click="modalPlaylist = playlist, playlistInput = playlist.name" ><i class="fas fa-edit"></i></button>
              <remove-button class="text-success bg-transparent"
                :id="playlist.id"
                :openedPlaylist="openedPlaylist"
                :showMusic="showMusic" @removePlaylist="removePlaylist($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else id="noPlaylistLabel">
      <p class="fs-5 text-success text-center m-2">No playlists found, try adding one by hitting the floating "+" button</p>
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
      if (event.target !== event.currentTarget) return
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
#noPlaylistLabel {
  width: 100%;
  position: fixed;
  top: 40%;
}

.card-img-top {
  object-fit: cover;
  height:230px;
  filter: blur(3px);
  background-color: black;
  opacity: 0.2;
}
</style>
