<template>
  <div>
    <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update music</h5>
            <button type="button" class="btn-close" id="modalCloseButton" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" placeholder="" v-model="musicInput">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" @click="editMusic(modalMusic)" >Save changes</button>
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
                :audio="audio" v-on:pause="pauseMusic"
              />
              <play-music v-else class="btn-success"
                :id="music.id"
                :audio="audio"
                v-on:play="playMusic($event)"
              />
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" @click="modalMusic = music" ><i class="fas fa-edit"></i></button>
              <button class="btn btn-danger" type="button" @click="removeMusic(music.id)"><i  class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorManager from '@/services/ErrorManager.js'
import PlayMusic from '@/components/MusicButtons/PlayMusic.vue'
import PauseMusic from '@/components/MusicButtons/PauseMusic.vue'

export default {
  name: 'MusicList',
  props: ['musics', 'loadedMusic', 'playStatus', 'audio'],
  components: {
    PlayMusic,
    PauseMusic
  },
  data () {
    return {
      musicInput: '',
      modalMusic: []
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
      this.$emit('remove', id)
    },
    editMusic (modalMusic) {
      if (this.musicInput !== '') {
        modalMusic.title = this.musicInput
        this.$emit('edit', modalMusic)
        document.getElementById('modalCloseButton').click()
        this.musicInput = ''
      } else {
        ErrorManager.showErrorMessage('Title can\'t be empty')
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
