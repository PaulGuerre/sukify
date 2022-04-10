<template>
  <div id="addMusic">
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <button type="button" class="btn-close" id="closeModal" data-bs-dismiss="modal" aria-label="Close" hidden></button>
          <div class="modal-body text-center">
            <button class="btn btn-success" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Downloading : {{ musicInput }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="input-group mb-3">
      <input type="text" class="form-control border-success text-success" placeholder="Title or URL" v-model="musicInput">
      <button class="btn btn-success" type="button" id="addMusicButton" data-bs-toggle="modal" :data-bs-target="musicInput === '' ? null : '#staticBackdrop'" @click="addMusic(musicInput)"><i  class="fas fa-plus"></i></button>
    </div>
  </div>
</template>

<script>
import ApiManager from '@/services/ApiManager.js'
import YoutubeApiManager from '@/services/YoutubeApiManager.js'
import ErrorManager from '@/services/ErrorManager.js'

export default {
  name: 'AddMusic',
  props: ['musics'],
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
              this.$emit('add')
            } else {
              ErrorManager.showErrorMessage('Error while adding music')
            }
            document.getElementById('closeModal').click()
            this.musicInput = ''
          })
        })
      } else {
        ErrorManager.showErrorMessage('Music name can\'t empty')
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
