<template>
  <div id="addMusic">
    <div class="modal fade" id="addMusicModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content" style="background-color: transparent;">
          <button type="button" class="btn-close" id="closeModal" data-bs-dismiss="modal" aria-label="Close" hidden></button>
          <div class="text-center">
            <div class="spinner-border text-success" style="width: 5rem; height: 5rem;" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="input-group mb-3">
      <input type="text" class="form-control border-success text-success" placeholder="Title or URL" v-model="musicInput">
      <button class="btn btn-success" type="button" id="addMusicButton" data-bs-toggle="modal" :data-bs-target="musicInput === '' ? null : '#addMusicModal'" @click="addMusic(musicInput)"><i  class="fas fa-plus"></i></button>
    </div>
  </div>
</template>

<script>
import InfoManager from '@/services/InfoManager.js'
import YoutubeApiManager from '@/services/YoutubeApiManager.js'
import ApiManager from '@/services/ApiManager.js'

export default {
  name: 'AddMusic',
  data () {
    return {
      musicInput: ''
    }
  },
  methods: {
    addMusic (musicInput) {
      if (musicInput !== '') {
        YoutubeApiManager.getVideo(musicInput).then(response => {
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
      } else {
        InfoManager.showInfo('Input name can\'t empty', 'danger')
      }
    }
  }
}
</script>

<style>
#addMusic {
  margin: 5%;
  margin-top: 12vh;
}
</style>
