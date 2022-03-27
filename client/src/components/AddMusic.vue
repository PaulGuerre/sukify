<template>
  <div id="addMusic">
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-body text-center">
              <button class="btn btn-success" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Downloading <bold>{{ musicInput }}</bold>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="input-group mb-3">
        <span>
          <select class="form-select border-success bg-success text-light" v-model="format">
            <option value="title">Title</option>
            <option value="url" selected>URL</option>
          </select>
        </span>
        <input type="text" class="form-control border-success text-success" placeholder="Music name" v-model="musicInput">
        <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="addMusic()"><i  class="fas fa-plus"></i></button>
      </div>
  </div>
</template>

<script>
import ApiManager from '@/services/ApiManager'

export default {
  name: 'AddMusic',
  data () {
    return {
      format: 'url',
      musicInput: '',
      banWords: ['Clip', 'Lyrics', 'Lyric', 'Officiel', 'Official', 'Video']
    }
  },
  methods: {
    addMusic () {
      const newMusic = { url: 'https://youtu.be/APKfnqKgdQw', title: this.titleReplace('Marwa Loud feat. Moha K - Bimbo (Clip Officiel)') }
      ApiManager.addMusic(newMusic).then(response => {
        this.$emit('add', newMusic)
      })
    },
    titleReplace (title) {
      let newTitle = title.split(' ')
      for (let i = 0; i < newTitle.length; i++) {
        newTitle[i] = newTitle[i].replace(/["'()]/g, '')
      }
      newTitle = newTitle.filter(item => !this.banWords.includes(item))
      return newTitle.join(' ')
    }
  }
}
</script>

<style>
#addMusic {
  margin: 5%;
}
</style>
