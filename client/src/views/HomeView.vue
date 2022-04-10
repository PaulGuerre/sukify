<template>
  <div v-if="connect" class="home" id="home">

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

    <nav-bar-music
      :loadedMusic="loadedMusic"
      :playStatus="playStatus"
      :audio="audio" v-on:play="play($event)" v-on:pause="pause"
      :playMode="playMode" v-on:repeat="enableRepeat" v-on:random="enableRandom" v-on:next="nextMusic" v-on:previous="previousMusic"
    />

    <add-music
      :musics="musics" v-on:add="loadMusic" v-on:keyup.enter="download"
    />

    <hr id="hr">

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
                :audio="audio" v-on:pause="pause"
              />
              <play-music v-else class="btn-success"
                :id="music.id"
                :audio="audio"
                v-on:play="play($event)"
              />
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" @click="modalMusic = music" ><i class="fas fa-edit"></i></button>
              <button class="btn btn-danger" type="button" @click="removeMusic(music.id)"><i  class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ErrorDisplayer />
  </div>

  <NotConnected v-else />
</template>

<script>
import ApiManager from '@/services/ApiManager'
import ErrorDisplayer from '@/components/Utils/ErrorDisplayer.vue'
import NavBarMusic from '@/components/NavBarMusic.vue'
import NotConnected from '@/components/Utils/NotConnected.vue'
import ErrorManager from '@/services/ErrorManager'
import PlayMusic from '@/components/PlayMusic.vue'
import PauseMusic from '../components/PauseMusic.vue'
import AddMusic from '@/components/AddMusic.vue'

export default {
  name: 'HomeView',
  components: {
    NavBarMusic,
    ErrorDisplayer,
    NotConnected,
    PlayMusic,
    PauseMusic,
    AddMusic
  },
  data () {
    return {
      audio: new Audio(),
      connect: false,
      playStatus: false,
      musics: [],
      modalMusic: [],
      loadedMusic: null,
      musicInput: '',
      playMode: 'list'
    }
  },
  methods: {
    loadMusic () {
      ApiManager.getMusics().then(response => {
        this.musics = response.data
        this.connect = true
      })
    },
    play (id) {
      if (this.audio.src !== ApiManager.getMusicSrc(id)) {
        this.audio.src = id === null ? ApiManager.getMusicSrc(this.musics[0].id) : ApiManager.getMusicSrc(id)
        this.audio.load()
        this.loadedMusic = id === null ? this.musics[0].id : id
      }
      this.playStatus = true
      this.audio.play()
    },
    pause () {
      this.playStatus = false
      this.audio.pause()
    },
    removeMusic (id) {
      ApiManager.removeMusic(id).then(response => {
        if (response.data.message === 'success') {
          this.musics = this.musics.filter(music => music.id !== id)
          if (this.audio.src === ApiManager.getMusicSrc(id)) {
            this.pause()
          }
        } else {
          ErrorManager.displayError('Error while removing music')
        }
      })
    },
    editMusic (music) {
      if (this.musicInput !== '') {
        this.modalMusic.title = this.musicInput
        ApiManager.updateMusic(music).then(response => {
          if (response.data.message === 'success') {
            this.loadMusic()
          } else {
            ErrorManager.displayError('Error while updating music')
          }
        })
        document.getElementById('modalCloseButton').click()
        this.musicInput = ''
      } else {
        ErrorManager.showErrorMessage('Title can\'t be empty')
      }
    },
    enableRepeat () {
      this.playMode = this.playMode === 'repeat' ? 'list' : 'repeat'
    },
    enableRandom () {
      this.playMode = this.playMode === 'random' ? 'list' : 'random'
    },
    nextMusic () {
      this.loadedMusic = this.loadedMusic === this.musics[this.musics.length - 1].id ? this.musics[0].id : this.musics[this.musics.findIndex(music => music.id === this.loadedMusic) + 1].id
      this.play(this.loadedMusic)
    },
    previousMusic () {
      this.loadedMusic = this.loadedMusic === this.musics[0].id ? this.musics[this.musics.length - 1].id : this.musics[this.musics.findIndex(music => music.id === this.loadedMusic) - 1].id
      this.play(this.loadedMusic)
    },
    download () {
      document.getElementById('addMusicButton').click()
    }
  },
  mounted () {
    this.loadMusic()
    this.audio.addEventListener('ended', () => {
      switch (this.playMode) {
        case 'list':
          this.loadedMusic = this.loadedMusic === this.musics[this.musics.length - 1].id ? this.musics[0].id : this.musics[this.musics.findIndex(music => music.id === this.loadedMusic) + 1].id
          this.play(this.loadedMusic)
          break
        case 'random':
          this.play(this.musics[Math.floor(Math.random() * this.musics.length)].id)
          break
        case 'repeat':
          this.play(this.loadedMusic)
          break
        default:
          this.play(this.musics[0].id)
          break
      }
    })
    this.audio.addEventListener('pause', () => {
      this.pause()
    })
    this.audio.addEventListener('play', () => {
      this.play(this.loadedMusic)
    })
  }
}
</script>

<style>
#home {
  background-color: #212529;
}

#hr {
  color: white;
  margin: auto;
  margin-bottom: 4%;
  width: 80%;
  height: 5px;
  border-radius: 5px;
}

.card {
  margin: 5%;
  box-shadow: 5px 5px 5px #000000;
}
</style>
