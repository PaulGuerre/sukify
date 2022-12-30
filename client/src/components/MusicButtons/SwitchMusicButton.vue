<template>
    <button class="btn text-success bg-transparent" type="button" @click="switchMusic">
        <i :class="{ 'fas fa-angle-double-left': !isRight, 'fas fa-angle-double-right': isRight }"></i>
    </button>
</template>

<script>
import AudioManager from '@/services/AudioManager'

export default {
  name: 'SwitchMusicButton',
  props: { isRight: Boolean },
  computed: {
    musics () {
      return this.$store.getters.musics
    },
    currentMusic () {
      return this.$store.getters.currentMusic
    }
  },
  methods: {
    switchMusic () {
      if (this.isRight) {
        AudioManager.nextMusic()
      } else {
        AudioManager.prevMusic()
      }
    }
  }
}
</script>
