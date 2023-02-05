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

<style>
.switch-music-icon {
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: 1px solid;
  border-radius: 50%;
  padding: 5px;
}

.switch-music-icon:hover {
  color: #00b849;
}
</style>
