<template>
  <div id="musicList">
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

    <div v-if="connect" class="row row-cols-md-3 row-cols-lg-5">
      <div class="col" v-for="music in musics" :key="music.id">
        <div class="card">
          <img :src="'https://i.ytimg.com/vi/' + music.videoID + '/mqdefault.jpg'" class="card-img-top">
          <div class="card-body">
            <p class="card-text text-truncate">{{ music.title }}</p>
          </div>
          <div class="card-footer text-center">
            <div class="btn-group" role="group">
              <PlayMusic :id="music.id" :audio="audio" v-on:play="play($event)" v-on:pause="pause()" :playStatus="playStatus" />
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" @click="modalMusic = music" ><i class="fas fa-edit"></i></button>
              <RemoveMusic :id="music.id" :musics="musics" v-on:remove="removeMusic($event)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="row row-cols-md-3 row-cols-lg-5">
      <div class="col" v-for="index in 5" :key="index">
        <div class="card placeholder-wave">
          <img src="../assets/placeholder.png" class="card-img-top placeholder">
          <div class="card-body placeholder-wave">
            <span class="placeholder col-6 placeholder-lg"></span>
          </div>
          <div class="card-footer text-center placeholder-wave">
            <div class="btn-group col-6" role="group">
              <button class="btn btn-success disabled placeholder" type="button"></button>
              <button class="btn btn-warning disabled placeholder" type="button"></button>
              <button class="btn btn-danger disabled placeholder" type="button"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ErrorManager />
    <!--<div id="shuffle" class="bg-dark">
      <ul class="nav nav-pills nav-fill">
        <li class="nav-item placeholder-wave">
          <img v-if="currentMusic !== null" :src="'http://localhost:3000/musics/' + currentMusic + '/thumbnail'" class="img-thumbnail bg-dark border-dark" id="shuffleImg" />
          <img v-else src="../assets/shufflePlaceholder.png" class="img-thumbnail bg-dark border-dark placeholder" id="shuffleImg" />
        </li>
        <li class="nav-item">
          <button class="btn btn-success border-dark border-4 rounded-3" id="shufflePlayButton" type="button"><i class="fas fa-play"></i></button>
        </li>
        <li class="nav-item">
          <button class="btn btn-success border-dark border-4 rounded-3" id="playingStyle" type="button"><i class="fas fa-undo"></i></button>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
import RemoveMusic from '@/components/RemoveMusic.vue'
import PlayMusic from '@/components/PlayMusic.vue'
import ErrorManager from '@/services/ErrorManager.js'

export default {
  name: 'ListMusic',
  components: {
    RemoveMusic,
    PlayMusic,
    ErrorManager
  },
  props: ['audio', 'musics', 'connect', 'playStatus'],
  data () {
    return {
      musicInput: '',
      modalMusic: [],
      errors: []
    }
  },
  methods: {
    play (id) {
      this.$emit('play', id)
    },
    pause () {
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
#musicList {
  background-color: darkslategray;
}

#listGroupItems {
  background-color: darkslategray;
  border-color: darkslategray;
}

#shuffle {
  position: fixed;
  bottom: 0;
  width: 100%;
}

#shuffleImg {
  width: 100px;
  float: left;
}

#playingStyle {
  height: 100%;
  width: 100px;
  float: right;
}

#shufflePlayButton {
  height: 100%;
  width: 100px;
}

.card {
  margin: 5%;
  box-shadow: 5px 5px 5px #000000;
}
</style>
