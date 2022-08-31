<template>
  <div id="addTest">
    <div class="modal fade" id="addMusicModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content shadow-none" style="background-color: transparent;">
          <button type="button" class="btn-close" id="closeModal" data-bs-dismiss="modal" aria-label="Close" hidden></button>
          <div class="text-center">
            <div class="spinner-border text-success" style="width: 5rem; height: 5rem;" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="offcanvas offcanvas-start bg-dark" tabindex="-1" id="offcanvas">
      <div class="offcanvas-header text-white">
        <h5 class="offcanvas-title">Sukify</h5>
        <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <h5 class="text-success">Add music & playlist</h5>
        <div class="input-group mb-3">
          <input type="text" class="form-control border-success text-dark" placeholder="Title or URL" v-model="musicInput" @keyup.enter="download()">
          <button class="btn btn-success" type="button" id="addMusicButton" data-bs-toggle="modal" :data-bs-target="musicInput === '' ? null : '#addMusicModal'" @click="addMusic(musicInput)"><i  class="fas fa-plus"></i></button>
        </div>
        <div class="input-group mb-3">
          <button class="btn btn-success" type="button" @click="addPlaylist(playlistInput)"><i  class="fas fa-plus"></i></button>
          <input type="text" class="form-control border-success text-dark" placeholder="Playlist name" v-model="playlistInput" @keyup.enter="addPlaylist(playlistInput)">
        </div>
      </div>
    </div>

    <button class="btn btn-success btn-floating btn-lg" id="plusButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"><i class="fas fa-music"></i></button>
  </div>
</template>

<script>
import YoutubeApiManager from '@/services/YoutubeApiManager.js'
import ApiManager from '@/services/ApiManager.js'
import InfoManager from '@/services/InfoManager.js'

export default {
  name: 'MoreAction',
  data () {
    return {
      musicInput: '',
      playlistInput: ''
    }
  },
  methods: {
    addMusic (musicInput) {
      if (musicInput !== '') {
        ApiManager.getYoutubeApiKey().then(response => {
          YoutubeApiManager.getVideo(musicInput, response.data.youtubeApiKey).then(response => {
            const newMusic = { title: response.data.items[0].snippet.title, videoID: response.data.items[0].id.videoId }
            ApiManager.addMusic(newMusic).then(response => {
              if (response.data.message === 'success') {
                this.$emit('loadMusic')
                this.musicInput = ''
                InfoManager.showInfo('Music added', 'success')
              } else {
                InfoManager.showInfo('Error while adding music', 'danger')
              }
              document.getElementById('closeModal').click()
            })
          })
        })
      } else {
        InfoManager.showInfo('Input name can\'t empty', 'danger')
      }
    },
    addPlaylist (playlistInput) {
      if (playlistInput !== '') {
        const playlist = { name: playlistInput }
        ApiManager.addPlaylist(playlist).then(response => {
          if (response.data.message === 'success') {
            this.$emit('loadPlaylist')
            this.playlistInput = ''
          } else {
            InfoManager.showInfo('Error while creating playlist', 'danger')
          }
          document.getElementById('closeModalButton').click()
        })
      } else {
        InfoManager.showInfo('Playlist name can\'t empty', 'danger')
      }
    },
    download () {
      document.getElementById('addMusicButton').click()
    }
  }
}
</script>

<style>
#plusButton {
  position: fixed;
  right: 1%;
  top: 50%;
  opacity: 0.5;
  z-index: 2;
}

#plusButton:hover {
  opacity: 1;
}
</style>
