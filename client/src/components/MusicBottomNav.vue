<template>
  <div id="musicBottomNav" class="bg-dark">
    <div class="row align-items-center">
      <div class="col-2 text-start">
        <img v-if="currentMusic !== ''" :src="'https://i.ytimg.com/vi/' + currentVideoID + '/mqdefault.jpg'" class="img-thumbnail bg-dark border-dark" id="shuffleImg" />
        <img v-else src="../assets/shufflePlaceholder.png" class="img-thumbnail bg-dark border-dark placeholder placeholder-wave" id="shuffleImg" />
      </div>
      <div class="col-4 text-center align-bottom">
        <button v-if="playStatus === currentMusic" id="playButton" class="btn btn-success" type="button" @click="pause()"><i  class="fas fa-pause"></i></button>
        <button v-else class="btn btn-success" id="playButton" type="button" @click="play(currentMusic)"><i  class="fas fa-play"></i></button>
      </div>
      <div class="col-6 text-center">
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" :aria-valuenow="currentTime" aria-valuemin="0" aria-valuemax="100" :style="'width: ' + currentTime + '%'" ></div>
        </div>
      </div>
    </div>
    <!--<ul class="nav nav-fill">
      <li class="nav-item">
        <img v-if="currentMusic !== ''" :src="'https://i.ytimg.com/vi/' + currentVideoID + '/mqdefault.jpg'" class="img-thumbnail bg-dark border-dark" id="shuffleImg" />
        <img v-else src="../assets/shufflePlaceholder.png" class="img-thumbnail bg-dark border-dark placeholder placeholder-wave" id="shuffleImg" />
      </li>
      <li class="nav-item">
        <button v-if="playStatus === currentMusic" class="btn btn-success" type="button" @click="pause()"><i  class="fas fa-pause"></i></button>
        <button v-else class="btn btn-success" type="button" @click="play(currentMusic)"><i  class="fas fa-play"></i></button>
      </li>
      <li class="nav-item process">
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" :aria-valuenow="currentTime" aria-valuemin="0" aria-valuemax="100" :style="'width: ' + currentTime + '%'" ></div>
        </div>
      </li>
    </ul>-->
  </div>
</template>

<script>
export default {
  name: 'MusicBottomNav',
  props: ['audio', 'playStatus', 'currentMusic', 'currentVideoID'],
  data () {
    return {
      currentTime: 0
    }
  },
  methods: {
    play (id) {
      if (this.currentMusic !== '') {
        this.$emit('play', id)
      }
    },
    pause () {
      this.$emit('pause')
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
#musicBottomNav {
  position: fixed;
  width: 100%;
  bottom: 0;
}

#playButton {
  border-radius: 50px;
  margin: 2%;
}

.progress {
  margin-right: 5%;
}
</style>
