<template>
    <button class="btn text-success bg-transparent" type="button" @click="toggleMusic" :disabled="!music">
        <i :class="{ 'fas fa-play': !isPlaying, 'fas fa-pause': isPlaying }"></i>
    </button>
</template>

<script>
import AudioManager from '@/services/AudioManager'
import ApiManager from '@/services/ApiManager'

export default {
  name: 'ToggleMusicButton',
  props: { music: Boolean },
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
        this.$store.dispatch('setPlayState', true)
      } else {
        AudioManager.pause()
        this.$store.dispatch('setPlayState', false)
      }
    }
  }
}
</script>
