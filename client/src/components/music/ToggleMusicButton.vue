<template>
  <font-awesome-icon :icon="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'" class="toggle-music-icon" @click="toggleMusic" />
</template>

<script>
import AudioManager from '@/services/AudioManager'
import ApiManager from '@/services/ApiManager'

export default {
  name: 'ToggleMusicButton',
  props: { music: Object },
  computed: {
    currentMusic () {
      return this.$store.getters.currentMusic
    },
    playState () {
      return this.$store.getters.playState
    },
    isPlaying () {
      if (!this.currentMusic || !this.playState) return false
      return this.music.id === this.currentMusic.id
    }
  },
  methods: {
    toggleMusic () {
      if (!this.isPlaying) {
        const musicSrc = ApiManager.getMusicSrc(this.music.id)
        AudioManager.play(musicSrc)

        this.$store.dispatch('setCurrentMusic', this.music)
        this.$store.dispatch('setCurrentPlaylist', null)
      } else {
        AudioManager.pause()
      }
    }
  }
}
</script>

<style scoped>
.toggle-music-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 5px;
  padding-bottom: 0;
}

.toggle-music-icon:hover {
  color: #00b849;
}
</style>
