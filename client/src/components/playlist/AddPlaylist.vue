<template>
  <v-card class="ma-2 pa-3">
    <v-row no-gutters justify="center">
      <v-col cols="auto">
        <input type="text" v-model="playlistTitle" class="form-control input-field pa-2 ma-2" placeholder="Playlist title" @keyup.enter="addPlaylist" />
      </v-col>
      <v-col cols="auto">
        <button class="login-btn pa-2 ma-2" type="button" @click="addPlaylist">Add playlist</button>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ApiManager from '@/services/ApiManager'

export default {
  name: 'AddMusic',
  data () {
    return {
      playlistTitle: ''
    }
  },
  methods: {
    addPlaylist () {
      ApiManager.addPlaylist(this.playlistTitle).then(response => {
        if (response.data.message === 'success') {
          ApiManager.getPlaylists().then(response => {
            this.$store.dispatch('setPlaylists', response.data)
          })
        }
      })
    }
  }
}
</script>

<style>
.input-field {
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
}

.login-btn {
  background-color: #1db954;
  color: white;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
}
</style>
