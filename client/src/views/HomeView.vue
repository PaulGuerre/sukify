<template>
  <div class="home" id="home">
    <NavBarMusic :connect="connect" :currentMusic="currentMusic" :audio="audio" v-on:play="play($event)" v-on:pause="pause" :playStatus="playStatus" :playMode="playMode" v-on:repeat="enableRepeat($event)" v-on:random="enableRandom($event)" v-on:next="nextMusic"  v-on:previous="previousMusic" />
    <AddMusicApi :musics="musics" v-on:add="loadMusic" :connect="connect" />
    <hr id="hr">
    <ListMusicApi :audio="audio" v-on:play="play($event)" v-on:pause="pause" :musics="musics" v-on:remove="removeMusic($event)" v-on:edit="editMusic($event)" :connect="connect" :playStatus="playStatus" />
    <MusicLevel :audio="audio" v-on:volume="updateVolume($event)" />
    <ErrorDisplayer />
  </div>
</template>

<script>
import AddMusicApi from '@/components/AddMusic.vue'
import ListMusicApi from '@/components/ListMusics.vue'
import ApiManager from '@/services/ApiManager'
import ErrorDisplayer from '@/components/ErrorDisplayer.vue'
import NavBarMusic from '@/components/NavBarMusic.vue'
import MusicLevel from '../components/MusicLevel.vue'

export default {
  name: 'HomeView',
  components: {
    AddMusicApi,
    ListMusicApi,
    ErrorDisplayer,
    NavBarMusic,
    MusicLevel
  },
  data () {
    return {
      audio: new Audio(),
      musics: [],
      connect: false,
      playStatus: null,
      currentMusic: '',
      playMode: 'list'
    }
  },
  methods: {
    play (id) {
      if (this.audio.src !== 'http://localhost:3000/musics/' + id) {
        this.audio.src = id === '' ? 'http://localhost:3000/musics/' + this.musics[0].id : 'http://localhost:3000/musics/' + id
        this.audio.load()
        this.currentMusic = id === '' ? this.musics[0].id : id
      }
      this.playStatus = id === '' ? this.musics[0].id : id
      this.audio.play()
    },
    pause () {
      this.playStatus = null
      this.audio.pause()
    },
    removeMusic (id) {
      this.musics = this.musics.filter(music => music.id !== id)
      if (this.audio.src === 'http://localhost:3000/musics/' + id) {
        this.pause()
      }
    },
    editMusic (music) {
      ApiManager.updateMusic(music).then(response => {
        if (response.data.message === 'success') {
          this.loadMusic()
        }
      })
    },
    loadMusic () {
      ApiManager.getMusics().then(response => {
        this.musics = response.data
        this.connect = true
      })
      this.audio.volume = 0.5
    },
    enableRepeat (mode) {
      this.playMode = mode
    },
    enableRandom (mode) {
      this.playMode = mode
    },
    nextMusic () {
      this.currentMusic = this.currentMusic === this.musics[this.musics.length - 1].id ? this.musics[0].id : this.currentMusic + 1
      this.play(this.currentMusic)
    },
    previousMusic () {
      this.currentMusic = this.currentMusic === this.musics[0].id ? this.musics[this.musics.length - 1].id : this.currentMusic - 1
      this.play(this.currentMusic)
    },
    updateVolume (volume) {
      this.audio.volume = volume
    }
  },
  mounted () {
    this.loadMusic()
    this.audio.addEventListener('ended', () => {
      switch (this.playMode) {
        case 'list':
          this.currentMusic = this.currentMusic === this.musics[this.musics.length - 1].id ? this.musics[0].id : this.currentMusic + 1
          this.play(this.currentMusic)
          break
        case 'random':
          this.play(this.musics[Math.floor(Math.random() * this.musics.length)].id)
          break
        case 'repeat':
          this.play(this.currentMusic)
          break
        default:
          this.play(this.musics[0].id)
          break
      }
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
