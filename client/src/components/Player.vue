<template>
  <v-bottom-navigation :height="70" :elevation="0">
    <v-col cols="auto" align-self="center">
      <img :src="'https://i.ytimg.com/vi/' + currentMusic?.videoID + '/mqdefault.jpg'" alt="Current music thumbnail" class="current-music-thumbnail">
    </v-col>
    <v-col v-if="!isMobile" cols="auto" align-self="center">
      <span>{{ currentMusic?.title }}</span>
    </v-col>
    <v-col cols="auto" align-self="center">
      <switch-music-button />
      <toggle-music-button :music=currentMusic />
      <switch-music-button is-right />
    </v-col>
    <v-col cols="auto" align-self="center">
      <switch-mode-button :mode="SHUFFLE_MODE" />
      <switch-mode-button :mode="REPEAT_MODE" />
    </v-col>
    <v-col align-self="center">
      <v-progress-linear :indeterminate="musicTime ? false : true" :model-value="musicTime" class="music-progress-bar" />
    </v-col>
    <v-col v-if="!isMobile" cols="auto" align-self="center">
      <font-awesome-icon icon="fa-solid fa-volume-up" class="volume-icon" />
    </v-col>
    <v-col v-if="!isMobile" cols="2" align-self="center">
      <v-slider v-model="volume" track-color="green" :max="1" :min="0" :step="0.01" hide-details />
    </v-col>
  </v-bottom-navigation>
</template>

<script>
import SwitchMusicButton from '@/components/music/SwitchMusicButton.vue'
import SwitchModeButton from '@/components/music/SwitchModeButton.vue'
import ToggleMusicButton from '@/components/music/ToggleMusicButton.vue'
import C from '@/constants/constants'
import AudioManager from '@/services/AudioManager'

export default {
  name: 'Player',
  data () {
    return {
      SHUFFLE_MODE: C.SHUFFLE_MODE,
      REPEAT_MODE: C.REPEAT_MODE,
      volume: AudioManager.getVolume()
    }
  },
  components: { SwitchMusicButton, SwitchModeButton, ToggleMusicButton },
  watch: {
    volume (value) {
      AudioManager.setVolume(value)
    }
  },
  computed: {
    currentMusic () {
      return this.$store.getters.currentMusic
    },
    musicTime () {
      return this.$store.getters.musicTime
    },
    isMobile () {
      return this.$store.getters.isMobile
    }
  }
}
</script>

<style scoped>
.v-bottom-navigation__content {
  border-top: 1px solid #3c3c3c;
}

.current-music-thumbnail {
  height: 50px;
  border: 4px solid #424242;
  border-radius: 5px;
}

.music-progress-bar {
  height: 5px;
  border-radius: 5px;
  color: #00b849;
}

.volume-icon {
  cursor: pointer;
  height: 20px;
  width: 20px;
  padding: 5px;
  padding-bottom: 0;
}
</style>
