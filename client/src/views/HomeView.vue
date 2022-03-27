<template>
  <div class="home" id="home">
    <AddMusicApi :musics="musics" v-on:add="addMusic($event)" />
    <hr id="hr">
    <PlaylistsOcApi />
    <ListMusicApi :audio="audio" v-on:play="play($event)" v-on:pause="pause()" :musics="musics" v-on:remove="removeMusic($event)" :connect="connect" />
  </div>
</template>

<script>
import AddMusicApi from '@/components/AddMusic.vue'
import ListMusicApi from '@/components/ListMusics.vue'
import PlaylistsOcApi from '@/components/PlaylistsOc.vue'
import ApiManager from '@/services/ApiManager'

export default {
  name: 'HomeView',
  components: {
    AddMusicApi,
    ListMusicApi,
    PlaylistsOcApi
  },
  data () {
    return {
      audio: new Audio(),
      musics: [],
      connect: false
    }
  },
  methods: {
    play (id) {
      if (this.audio.src !== 'http://localhost:3000/musics/' + id) {
        this.audio.src = 'http://localhost:3000/musics/' + id
        this.audio.load()
      }
      this.audio.play()
    },
    pause () {
      this.audio.pause()
    },
    removeMusic (id) {
      this.musics = this.musics.filter(music => music.id !== id)
    },
    addMusic ($event) {
      this.musics.push($event)
    }
  },
  mounted () {
    this.musics = ApiManager.getMusics().then(response => {
      this.musics = response.data
      this.connect = true
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
