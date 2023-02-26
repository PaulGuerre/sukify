<template>
  <font-awesome-icon :icon="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'" class="toggle-playlist-icon" @click="togglePlaylist" />
</template>

<script>
import AudioManager from '@/services/AudioManager'
import ApiManager from '@/services/ApiManager'

export default {
  name: 'TogglePlaylistButton',
  props: { playlistMusics: Array, playlistId: Number },
  computed: {
    currentMusic () {
      return this.$store.getters.currentMusic
    },
    currentPlaylist () {
      return this.$store.getters.currentPlaylist
    },
    playState () {
      return this.$store.getters.playState
    },
    isPlaying () {
      if (!this.currentMusic || !this.playState) return false
      return this.playlistId === this.currentPlaylist
    }
  },
  methods: {
    togglePlaylist () {
      this.$store.dispatch('setCurrentMusics', this.playlistMusics)
      if (!this.isPlaying) {
        const musicSrc = ApiManager.getMusicSrc(this.playlistMusics[0].id)
        AudioManager.play(musicSrc)

        this.$store.dispatch('setCurrentPlaylist', this.playlistId)
        this.$store.dispatch('setCurrentMusic', this.playlistMusics[0])
      } else {
        AudioManager.pause()
      }
    }
  }
}
</script>

<style scoped>
.toggle-playlist-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 5px;
  padding-bottom: 0;
}

.toggle-playlist-icon:hover {
  color: #00b849;
}
</style>
