<template>
  <div class="home" id="home">
    <NavBarMusic :currentMusic="currentMusic" :audio="audio" v-on:play="play($event)" v-on:pause="pause" :playStatus="playStatus" :playMode="playMode" v-on:repeat="enableRepeat($event)" v-on:random="enableRandom($event)" />
    <AddMusicApi :musics="musics" v-on:add="loadMusic" :connect="connect" />
    <hr id="hr">
    <PlaylistsOcApi :connect="connect" />
    <ListMusicApi :audio="audio" v-on:play="play($event)" v-on:pause="pause" :musics="musics" v-on:remove="removeMusic($event)" v-on:edit="editMusic($event)" :connect="connect" :playStatus="playStatus" />
    <ErrorDisplayer />
  </div>
</template>

<script>
import AddMusicApi from '@/components/AddMusic.vue'
import ListMusicApi from '@/components/ListMusics.vue'
import PlaylistsOcApi from '@/components/PlaylistsOc.vue'
import ApiManager from '@/services/ApiManager'
import ErrorDisplayer from '@/components/ErrorDisplayer.vue'
import NavBarMusic from '@/components/NavBarMusic.vue'

export default {
  name: 'HomeView',
  components: {
    AddMusicApi,
    ListMusicApi,
    PlaylistsOcApi,
    ErrorDisplayer,
    NavBarMusic
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
        this.audio.src = 'http://localhost:3000/musics/' + id
        this.audio.load()
        this.currentMusic = id
      }
      this.playStatus = id
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
    },
    enableRepeat (mode) {
      this.playMode = mode
    },
    enableRandom (mode) {
      this.playMode = mode
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
  background-color: darkslategray;
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
