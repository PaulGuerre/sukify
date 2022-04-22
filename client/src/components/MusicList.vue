<template>
  <div id="musicList">
    <div class="modal fade" id="addMusicPlaylistModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-dark border border-success">
          <div class="modal-header border border-dark">
            <h5 class="modal-title text-success">Update music</h5>
            <button type="button" class="btn-close btn-close-white" id="modalCloseButton" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <select class="form-select" v-model="playlistInput">
              <option value="" disabled selected>Choose playlist</option>
              <option v-for="playlist in playlists" :key="playlist.id">{{ playlist.name }}</option>
            </select>
          </div>
          <div class="modal-footer border border-dark justify-content-around">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" @click="addMusicPlaylist(modalMusic)" >Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3" style="margin-right: 2%; margin-left: 2%; margin-top: 10vh;">
      <div class="border border-4 border-dark bg-dark" v-for="music in musics" :key="music.id">
        <div class="row rounded border borer-4 border-success">
          <div class="col-5 col-md-4 col-lg-3 text-start p-0">
            <img :src="'https://i.ytimg.com/vi/' + music.videoID + '/mqdefault.jpg'" class="img-thumbnail bg-dark border-0" alt="Responsive image">
          </div>
          <div class="col-7 col-md-8 col-lg-9 fs-5 text-success text-truncate text-start row">
            <span class="text-truncate col-12">{{ music.title }}</span>
            <div class="col-1 col-md-1 col-lg-1 btn-group btn-group-sm shadow-none" role="group" style="max-height: 30px;">
              <pause-music v-if="loadedMusic === music.id && playStatus" class="btn-success"
                :audio="audio" @pause="pauseMusic()"
              />
              <play-music v-else class="btn-success"
                :id="music.id"
                :audio="audio" @play="playMusic($event)"
              />
              <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addMusicPlaylistModal" @click="modalMusic = music"><i class="fas fa-plus"></i></button>
              <remove-button :id="music.id"
                :openedPlaylist="openedPlaylist"
                :showMusic="showMusic" @removeMusic="removeMusic($event)" @removePlaylistMusic="removePlaylistMusic($event)"
              />
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoManager from '@/services/InfoManager.js'
import PlayMusic from '@/components/MusicButtons/PlayMusic.vue'
import PauseMusic from '@/components/MusicButtons/PauseMusic.vue'
import ApiManager from '@/services/ApiManager.js'
import RemoveButton from '@/components/RemoveButton.vue'

export default {
  name: 'MusicList',
  props: ['audio', 'playlists', 'musics', 'loadedMusic', 'playStatus', 'openedPlaylist', 'showMusic'],
  components: {
    PlayMusic,
    PauseMusic,
    RemoveButton
  },
  data () {
    return {
      modalMusic: [],
      playlistInput: ''
    }
  },
  methods: {
    playMusic (id) {
      this.$emit('play', id)
    },
    pauseMusic () {
      this.$emit('pause')
    },
    removeMusic (id) {
      this.$emit('removeMusic', id)
    },
    addMusicPlaylist (modalMusic) {
      if (this.playlistInput !== '') {
        ApiManager.getPlaylistByName(this.playlistInput).then(response => {
          ApiManager.addMusicToPlaylist(modalMusic.id, response.data[0].id).then(response => {
            if (response.data.message === 'success') {
              document.getElementById('modalCloseButton').click()
              this.playlistInput = ''
              InfoManager.showInfo('Music added to playlist', 'success')
            } else {
              InfoManager.showInfo('Error while adding music to playlit', 'danger')
            }
          })
        })
      } else {
        InfoManager.showInfo('Playlist can\'t be empty', 'danger')
      }
    }
  }
}
</script>
