<template>
  <v-card class="ma-2 pa-3">
    <v-row no-gutters>
      <v-col v-if="!isMobile" cols="2" align-self="center">
          <img :src="'https://i.ytimg.com/vi/' + music.videoID + '/mqdefault.jpg'" alt="Music thumbnail" class="music-thumbnail">
      </v-col>
      <v-col align-self="center" class="music-title">
        <span>{{ music.title }}</span>
      </v-col>
      <v-col cols="auto" align-self="center">
        <toggle-music-button :music=music />
        <add-to-playlist-button :musicId="music.id" />
        <delete-music-button :musicId=music.id />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DeleteMusicButton from '../musicButtons/DeleteMusicButton.vue'
import ToggleMusicButton from '../musicButtons/ToggleMusicButton.vue'
import AddToPlaylistButton from '../musicButtons/AddToPlaylistButton.vue'

export default {
  name: 'Music',
  props: { music: Object },
  components: {
    ToggleMusicButton,
    DeleteMusicButton,
    AddToPlaylistButton
  },
  computed: {
    isMobile () {
      return this.$store.getters.isMobile
    }
  }
}
</script>

<style>
.music-thumbnail {
  height: 50px;
  margin-top: 5px;
}

.music-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
