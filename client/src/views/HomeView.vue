<template>
  <div v-if="connect" class="home" id="home">
    <nav-bar-music
      :loadedMusic="loadedMusic"
      :playStatus="playStatus"
      :audio="audio" v-on:play="playMusic($event)" v-on:pause="pauseMusic"
      :playMode="playMode" v-on:repeat="enableRepeat" v-on:random="enableRandom" v-on:next="nextMusic" v-on:previous="previousMusic"
    />

    <add-music
      :musics="musics" v-on:add="loadMusic" v-on:keyup.enter="download"
    />

    <hr id="hr">

    <music-list
      :playStatus="playStatus"
      :loadedMusic="loadedMusic"
      :audio="audio" v-on:play="playMusic($event)" v-on:pause="pauseMusic"
      :musics="musics" v-on:remove="removeMusic($event)" v-on:edit="editMusic($event)"
    />

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
import AddMusic from '@/components/AddMusic.vue'
import MusicList from '../components/MusicList.vue'

export default {
  name: 'HomeView',
  components: {
    NavBarMusic,
    ErrorDisplayer,
    NotConnected,
    AddMusic,
    MusicList
  },
  data () {
    return {
      audio: new Audio(),
      connect: false,
      playStatus: false,
      musics: [],
      loadedMusic: null,
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
    playMusic (id) {
      if (this.audio.src !== ApiManager.getMusicSrc(id)) {
        this.audio.src = id === null ? ApiManager.getMusicSrc(this.musics[0].id) : ApiManager.getMusicSrc(id)
        this.audio.load()
        this.loadedMusic = id === null ? this.musics[0].id : id
      }
      this.playStatus = true
      this.audio.play()
    },
    pauseMusic () {
      this.playStatus = false
      this.audio.pause()
    },
    removeMusic (id) {
      ApiManager.removeMusic(id).then(response => {
        if (response.data.message === 'success') {
          this.musics = this.musics.filter(music => music.id !== id)
          if (this.audio.src === ApiManager.getMusicSrc(id)) {
            this.pauseMusic()
          }
        } else {
          ErrorManager.showErrorMessage('Error while removing music')
        }
      })
    },
    editMusic (music) {
      ApiManager.updateMusic(music).then(response => {
        if (response.data.message === 'success') {
          this.loadMusic()
        } else {
          ErrorManager.showErrorMessage('Error while updating music')
        }
      })
    },
    enableRepeat () {
      this.playMode = this.playMode === 'repeat' ? 'list' : 'repeat'
    },
    enableRandom () {
      this.playMode = this.playMode === 'random' ? 'list' : 'random'
    },
    nextMusic () {
      this.loadedMusic = this.loadedMusic === this.musics[this.musics.length - 1].id ? this.musics[0].id : this.musics[this.musics.findIndex(music => music.id === this.loadedMusic) + 1].id
      this.playMusic(this.loadedMusic)
    },
    previousMusic () {
      this.loadedMusic = this.loadedMusic === this.musics[0].id ? this.musics[this.musics.length - 1].id : this.musics[this.musics.findIndex(music => music.id === this.loadedMusic) - 1].id
      this.playMusic(this.loadedMusic)
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
          this.nextMusic()
          break
        case 'random':
          this.playMusic(this.musics[Math.floor(Math.random() * this.musics.length)].id)
          break
        case 'repeat':
          this.playMusic(this.loadedMusic)
          break
        default:
          this.playMusic(this.musics[0].id)
          break
      }
    })
    this.audio.addEventListener('pause', () => {
      this.pauseMusic()
    })
    this.audio.addEventListener('play', () => {
      this.playMusic(this.loadedMusic)
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
</style>
