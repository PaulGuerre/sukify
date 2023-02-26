<template>
  <v-card class="ma-2 pa-3">
    <v-row no-gutters justify="center">
      <v-col cols="auto">
        <input type="text" v-model="playlistTitle" class="form-control input-field pa-2 ma-2" placeholder="Playlist title" @keyup.enter="addPlaylist" />
      </v-col>
      <v-col cols="auto">
        <button class="add-playlist-btn pa-2 ma-2" type="button" @click="addPlaylist">Add playlist</button>
      </v-col>
    </v-row>
  </v-card>
  <info-manager ref="info" />
</template>

<script>
import ApiManager from '@/services/ApiManager'
import InfoManager from '@/components/InfoManager.vue'

export default {
  name: 'AddMusic',
  components: {
    InfoManager
  },
  data () {
    return {
      playlistTitle: ''
    }
  },
  methods: {
    addPlaylist () {
      const urlRegex = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/

      const addPlaylist = urlRegex.test(this.playlistTitle)
        ? ApiManager.addSpotifyPlaylist(this.playlistTitle)
        : ApiManager.addPlaylist(this.playlistTitle)

      addPlaylist.then(response => {
        this.$refs.info.showSuccess(response.data.message)
        this.playlistTitle = ''
        ApiManager.getPlaylists().then(response => {
          this.$store.dispatch('setPlaylists', response.data)
        })
      })
    }
  }
}
</script>

<style scoped>
.input-field {
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
  min-width: 500px;
}

.add-playlist-btn {
  background-color: #1db954;
  color: white;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
}
</style>
