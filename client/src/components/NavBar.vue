<template>
  <nav class="navbar navbar-expand-sm mb-4" style="background-color: #212121;">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand text-success">Sukify</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="text-light"><i class="fas fa-sliders-h"></i></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="container-fluid">
          <div class="row">
            <button class="btn btn-link text-success border-0 col-6 col-md-2 col-lg-1" style="background-color: #212121" @click="$router.push('/playlists')">Playlists</button>
            <button class="btn btn-link text-success border-0 col-6 col-md-2 col-lg-1" style="background-color: #212121" @click="$router.push('/musics')">Musics</button>
          </div>
        </div>
        <div class="d-flex btn-group btn-group-sm border border-success" role="group">
          <SwitchMusicButton :isRight=false />
          <ToggleMusicButton :music=this.currentMusic />&nbsp;
          <SwitchMusicButton :isRight=true />
          <button v-if="playMode !== 'repeat'" class="btn btn-light text-success" type="button" style="background-color: #212121" @click="updateMode('repeat')"><i class="fas fa-redo"></i></button>&nbsp;
          <button v-else class="btn btn-success text-dark" type="button" @click="updateMode('list')"><i class="fas fa-redo"></i></button>&nbsp;
          <button v-if="playMode !== 'random'" class="btn btn-light text-success" type="button" style="background-color: #212121"  @click="updateMode('random')"><i class="fas fa-random"></i></button>
          <button v-else class="btn btn-success text-dark" type="button" @click="updateMode('list')"><i class="fas fa-random"></i></button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import SwitchMusicButton from './MusicButtons/SwitchMusicButton.vue'
import ToggleMusicButton from './MusicButtons/ToggleMusicButton.vue'

export default {
  name: 'NavBarMusic',
  components: {
    ToggleMusicButton,
    SwitchMusicButton
  },
  computed: {
    currentMusic () {
      return this.$store.getters.currentMusic || false
    }
  }
}
</script>
