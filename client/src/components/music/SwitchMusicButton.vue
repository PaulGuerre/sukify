<template>
  <font-awesome-icon :icon="isRight ? 'fa-solid fa-angles-right' : 'fa-solid fa-angles-left'" class="switch-music-icon" @click="switchMusic" />
</template>

<script>
import AudioManager from '@/services/AudioManager'

export default {
  name: 'SwitchMusicButton',
  props: { isRight: Boolean },
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

<style scoped>
.switch-music-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 5px;
  padding-bottom: 0;
}

.switch-music-icon:hover {
  color: #00b849;
}
</style>
