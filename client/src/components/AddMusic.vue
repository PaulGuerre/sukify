<template>
  <div id="addMusic">
    <div class="modal fade" id="addMusicModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <button type="button" class="btn-close" id="closeModal" data-bs-dismiss="modal" aria-label="Close" hidden></button>
          <div class="modal-body text-center">
            <button class="btn btn-success" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Downloading
            </button>
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
import ErrorManager from '@/services/ErrorManager.js'

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
        this.$emit('add', musicInput)
        this.musicInput = ''
      } else {
        ErrorManager.showErrorMessage('Input name can\'t empty')
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
