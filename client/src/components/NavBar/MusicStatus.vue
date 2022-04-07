<template>
  <div class="progress">
    <div v-if="connect" class="progress-bar bg-success" role="progressbar" :aria-valuenow="currentTime" aria-valuemin="0" aria-valuemax="100" :style="'width: ' + currentTime + '%'" ></div>
    <div v-else class="progress-bar bg-success placeholder placeholder-wave" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;" ></div>
  </div>
</template>

<script>
export default {
  name: 'MusicStatus',
  props: ['connect', 'audio'],
  data () {
    return {
      currentTime: 0
    }
  },
  mounted () {
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = (this.audio.currentTime * 100) / this.audio.duration
    })
  }
}
</script>

<style>
.progress {
  width: 100%;
  margin-right: 2%;
  margin-left: 2%;
}
</style>
