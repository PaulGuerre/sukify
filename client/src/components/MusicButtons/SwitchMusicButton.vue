<template>
  <button class="btn text-success bg-transparent" type="button" @click="switchMusic">
    <font-awesome-icon :icon="isRight ? 'fa-solid fa-angles-right' : 'fa-solid fa-angles-left'" />
  </button>
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
