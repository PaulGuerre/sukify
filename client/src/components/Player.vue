<template>
  <v-bottom-navigation :height="70" :elevation="0">
    <v-col v-if="!isMobile" cols="2" class="p-1">
      <img :src="'https://i.ytimg.com/vi/' + currentMusic?.videoID + '/mqdefault.jpg'" alt="Current music thumbnail" class="current-music-thumbnail">
    </v-col>
    <v-col v-if="!isMobile" cols="3" align-self="center" class="p-1">
      <span style="max-width: 150px;">{{ currentMusic?.title }}</span>
    </v-col>
    <v-col :cols="isMobile ? 2 : 1" align-self="center" class="p-1">
      <switch-music-button />
    </v-col>
    <v-col :cols="isMobile ? 2 : 1" align-self="center" class="p-1">
      <toggle-music-button :music=currentMusic />
    </v-col>
    <v-col :cols="isMobile ? 2 : 1" align-self="center" class="p-1">
      <switch-music-button is-right />
    </v-col>
    <v-col :cols="isMobile ? 6 : 4" align-self="center">
      <v-progress-linear :indeterminate="musicTime ? false : true" :model-value="musicTime" class="music-progress-bar" />
    </v-col>
  </v-bottom-navigation>
</template>

<script>
import SwitchMusicButton from '@/components/MusicButtons/SwitchMusicButton.vue'
import ToggleMusicButton from '@/components/MusicButtons/ToggleMusicButton.vue'

export default {
  name: 'Player',
  props: {
    isMobile: {
      type: Boolean,
      required: true
    }
  },
  components: { SwitchMusicButton, ToggleMusicButton },
  computed: {
    currentMusic () {
      return this.$store.getters.currentMusic
    },
    musicTime () {
      return this.$store.getters.musicTime
    }
  }
}
</script>

<style>
.v-bottom-navigation__content {
  border-top: 1px solid #3c3c3c;
}

.current-music-thumbnail {
  height: 100%;
  border: 4px solid #424242;
  border-radius: 5px;
}

.music-progress-bar {
  height: 5px;
  border-radius: 5px;
  color: #00b849;
}
</style>
