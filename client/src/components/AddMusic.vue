<template>
  <div id="addMusic">
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <button type="button" class="btn-close" id="closeModal" data-bs-dismiss="modal" aria-label="Close" hidden></button>
          <div class="modal-body text-center">
            <button class="btn btn-success" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Downloading : <bold>{{ musicInput }}</bold>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="connect" class="input-group mb-3">
      <span>
        <select class="form-select border-success bg-success text-light" v-model="format">
          <option value="title">Title</option>
          <option value="url" selected>URL</option>
        </select>
      </span>
      <input type="text" class="form-control border-success text-success" :placeholder="format === 'title' ? 'Music name' : 'Youtube url'" v-model="musicInput">
      <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="addMusic(musicInput)"><i  class="fas fa-plus"></i></button>
    </div>
    <div v-else class="input-group mb-3 placeholder-wave">
      <span class="placeholder bg-light col-1"></span>
      <input type="text" class="form-control bg-ligth placeholder" placeholder="Not connected">
      <button class="btn bg-light disabled placeholder" type="button"><i  class="fas fa-plus"></i></button>
    </div>
  </div>
</template>

<script>
import ApiManager from '@/services/ApiManager.js'
import YoutubeApiManager from '@/services/YoutubeApiManager.js'

export default {
  name: 'AddMusic',
  props: ['connect'],
  data () {
    return {
      format: 'title',
      musicInput: ''
    }
  },
  methods: {
    addMusic (musicInput) {
      YoutubeApiManager.getVideo(musicInput).then(response => {
        const newMusic = { title: response.data.items[0].snippet.title, videoID: response.data.items[0].id.videoId }
        ApiManager.addMusic(newMusic).then(response => {
          if (response.data.message === 'success') {
            this.$emit('add')
            document.getElementById('closeModal').click()
            this.musicInput = ''
          } else {
            document.getElementById('closeModal').click()
            this.musicInput = ''
          }
        })
      })
    }
  }
}
</script>

<style>
#addMusic {
  margin: 5%;
}
</style>
