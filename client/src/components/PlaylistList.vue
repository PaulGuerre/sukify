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
            <input type="text" class="form-control" placeholder="" v-model="playlistInput">
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
                :audio="audio" v-on:pause="pauseMusic"
              />
              <play-music v-else class="btn-success"
                :id="playlist.musicId"
                :audio="audio"
                v-on:play="playMusic($event, playlist.id)"
              />
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editPlaylistModal" @click="modalPlaylist = playlist" ><i class="fas fa-edit"></i></button>
              <remove-button :id="playlist.id" :type="'playlist'" :showMusic="showMusic" v-on:removePlaylist="removePlaylist($event)" />
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

export default {
  name: 'PlaylistList',
  props: ['playlists', 'loadedMusic', 'playStatus', 'audio', 'musics', 'loadedPlaylist', 'showMusic'],
  components: {
    playMusic,
    pauseMusic,
    RemoveButton
  },
  data () {
    return {
      playlistMusics: [],
      modalPlaylist: [],
      playlistInput: ''
    }
  },
  methods: {
    playMusic (id, playlistId) {
      this.$emit('playPlaylist', playlistId)
    },
    pauseMusic () {
      this.$emit('pause')
    },
    loadPlaylistMusic (id) {
      this.$emit('loadPlaylistMusic', id)
    },
    removePlaylist (id) {
      this.$emit('removePlaylist', id)
    },
    editPlaylist () {
      if (this.playlistInput !== '') {
        this.modalPlaylist.name = this.playlistInput
        this.$emit('editPlaylist', this.modalPlaylist)
        document.getElementById('modalCloseButton').click()
        this.playlistInput = ''
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
