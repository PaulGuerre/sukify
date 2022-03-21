<template>
  <div id="musicList">
      <ul class="list-group" v-if="connect">
          <li class="list-group-item" id="listGroupItems" v-for="music in musics" :key="music.id">
              <div class="input-group mb-3">
                <PlayMusic :id="music.id" />
                <input type="text" class="form-control border-success" :placeholder="music.title" disabled>
                <RemoveMusic :id="music.id" />
            </div>
          </li>
      </ul>
      <ul class="list-group" v-else>
        <li class="list-group-item" id="listGroupItems" v-for="i in 10" :key="i">
          <p class="placeholder-glow">
            <span class="placeholder bg-light placeholder-lg col-12"></span>
          </p>
        </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'
import PlayMusic from '../components/PlayMusicApi.vue'
import RemoveMusic from '../components/RemoveMusicApi.vue'

export default {
  name: 'ListMusic',
  components: {
    PlayMusic,
    RemoveMusic
  },
  data () {
    return {
      connect: false,
      musics: [],
      errors: []
    }
  },
  created () {
    axios.get('http://localhost:3000/musics')
      .then(response => {
        this.connect = true
        this.musics = response.data
      })
      .catch(e => {
        this.error.push(e)
      })
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
</style>
