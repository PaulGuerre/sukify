<template>
  <v-col>
    <v-card class="ma-2 pa-3 playlist-card" ripple="false" @click=" $router.push('/playlists/' + playlist.id + '/musics')">
      <v-row no-gutters>
        <v-avatar
          class="ma-3"
          size="125"
          rounded="0"
        >
          <v-img :src="'https://i.ytimg.com/vi/' + playlistThumbnail + '/mqdefault.jpg'"></v-img>
        </v-avatar>
        <v-col>
          <v-card-title class="text-h5 playlist-title">
            {{ playlist.name }}
          </v-card-title>

          <v-card-text>{{ playlistMusics.length }} music(s)</v-card-text>

          <v-card-actions>
            <toggle-playlist-button :playlistMusics=playlistMusics :playlistId=playlist.id />
            <delete-playlist-button :playlistId=playlist.id />
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
import ApiManager from '@/services/ApiManager'
import DeletePlaylistButton from './DeletePlaylistButton.vue'
import TogglePlaylistButton from './TogglePlaylistButton.vue'

export default {
  name: 'Playlist',
  props: { playlist: Object },
  components: { DeletePlaylistButton, TogglePlaylistButton },
  data () {
    return {
      playlistMusics: [],
      playlistThumbnail: ''
    }
  },
  mounted () {
    ApiManager.getPlaylistMusics(this.playlist.id).then(response => {
      this.playlistMusics = response.data
      this.playlistThumbnail = response.data?.[0]?.videoID
    })
  }
}
</script>

<style>
.playlist-card {
  max-width: 350px;
}

.playlist-title {
  width: 150px;
}
</style>
