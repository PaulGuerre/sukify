<template>
  <div id="musicList">
    <div v-if="connect" class="row row-cols-md-3 row-cols-lg-5">
      <div class="col" v-for="music in musics" :key="music.id">
        <div class="card">
          <img :src="'http://localhost:3000/musics/' + music.id + '/thumbnail'" class="card-img-top">
          <div class="card-body">
            <p class="card-text text-truncate">{{ music.title }}</p>
          </div>
          <div class="card-footer text-center">
            <div class="btn-group" role="group">
              <PlayMusic :id="music.id" :audio="audio" v-on:play="play($event)" v-on:pause="pause()" :playStatus="playStatus" />
              <button class="btn btn-warning" type="button"><i  class="fas fa-edit"></i></button>
              <RemoveMusic :id="music.id" :musics="musics" v-on:remove="removeMusic($event)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row row-cols-md-3 row-cols-lg-5">
      <div class="col" v-for="index in 5" :key="index">
        <div class="card placeholder-wave">
          <img src="../assets/placeholder.png" class="card-img-top placeholder">
          <div class="card-body placeholder-wave">
            <span class="placeholder col-6 placeholder-lg"></span>
          </div>
          <div class="card-footer text-center placeholder-wave">
            <div class="btn-group col-6" role="group">
              <button class="btn btn-success disabled placeholder" type="button"></button>
              <button class="btn btn-warning disabled placeholder" type="button"></button>
              <button class="btn btn-danger disabled placeholder" type="button"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<div id="shuffle" class="bg-dark">
      <ul class="nav nav-pills nav-fill">
        <li class="nav-item placeholder-wave">
          <img v-if="currentMusic !== null" :src="'http://localhost:3000/musics/' + currentMusic + '/thumbnail'" class="img-thumbnail bg-dark border-dark" id="shuffleImg" />
          <img v-else src="../assets/shufflePlaceholder.png" class="img-thumbnail bg-dark border-dark placeholder" id="shuffleImg" />
        </li>
        <li class="nav-item">
          <button class="btn btn-success border-dark border-4 rounded-3" id="shufflePlayButton" type="button"><i class="fas fa-play"></i></button>
        </li>
        <li class="nav-item">
          <button class="btn btn-success border-dark border-4 rounded-3" id="playingStyle" type="button"><i class="fas fa-undo"></i></button>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
import RemoveMusic from '@/components/RemoveMusic.vue'
import PlayMusic from '@/components/PlayMusic.vue'

export default {
  name: 'ListMusic',
  components: {
    RemoveMusic,
    PlayMusic
  },
  props: ['audio', 'musics', 'connect'],
  data () {
    return {
      playStatus: null,
      // currentMusic: null,
      errors: []
    }
  },
  methods: {
    play (id) {
      this.playStatus = id
      this.$emit('play', id)
    },
    pause () {
      this.playStatus = null
      this.$emit('pause')
    },
    removeMusic (id) {
      this.$emit('remove', id)
    }
  }
}
</script>

<style>
#musicList {
  background-color: darkslategray;
}

#listGroupItems {
  background-color: darkslategray;
  border-color: darkslategray;
}

#shuffle {
  position: fixed;
  bottom: 0;
  width: 100%;
}

#shuffleImg {
  width: 100px;
  float: left;
}

#playingStyle {
  height: 100%;
  width: 100px;
  float: right;
}

#shufflePlayButton {
  height: 100%;
  width: 100px;
}

.card {
  margin: 5%;
  box-shadow: 5px 5px 5px #000000;
}
</style>
