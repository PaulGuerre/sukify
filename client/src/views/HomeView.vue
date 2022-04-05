<template>
  <div class="home" id="home">
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

export default {
  name: 'HomeView',
  components: {
    AddMusicApi,
    ListMusicApi,
    PlaylistsOcApi,
    ErrorDisplayer
  },
  data () {
    return {
      audio: new Audio(),
      musics: [],
      connect: false,
      playStatus: null
    }
  },
  methods: {
    play (id) {
      if (this.audio.src !== 'http://localhost:3000/musics/' + id) {
        this.audio.src = 'http://localhost:3000/musics/' + id
        this.audio.load()
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
    }
  },
  mounted () {
    this.loadMusic()
    this.audio.addEventListener('ended', () => {
      this.playStatus = null
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
