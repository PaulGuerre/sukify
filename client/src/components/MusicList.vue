<template>
  <div id="musicList">
    <div class="modal fade" id="addMusicPlaylistModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update music</h5>
            <button type="button" class="btn-close" id="modalCloseButton" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <select class="form-control" v-model="playlistInput">
              <option v-for="playlist in playlists" :key="playlist.id">{{ playlist.name }}</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" @click="addMusicPlaylist(modalMusic)" >Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-md-3 row-cols-lg-5">
      <div class="col" v-for="music in musics" :key="music.id">
        <div class="card border border-light">
          <img :src="'https://i.ytimg.com/vi/' + music.videoID + '/mqdefault.jpg'" class="card-img-top">
          <div class="card-body">
            <p class="card-text text-truncate">{{ music.title }}</p>
          </div>
          <div class="card-footer text-center">
            <div class="btn-group btn-group-sm" role="group">
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

<style>
.card {
  margin: 5%;
  box-shadow: 5px 5px 5px #000000;
}
</style>
