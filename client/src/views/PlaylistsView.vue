<template>
  <div>
    <nav-bar-music
      :loadedMusic="loadedMusic"
      :playStatus="playStatus"
      :audio="audio" v-on:play="playMusic($event)" v-on:pause="pauseMusic"
      :playMode="playMode" v-on:repeat="enableRepeat" v-on:random="enableRandom" v-on:next="nextMusic" v-on:previous="previousMusic"
    />

    <add-music
      :musics="musics" v-on:add="addPlaylist($event)" v-on:keyup.enter="download"
    />

    <hr id="hr">

    {{ playlists }}

    <add-playlist v-on:create="createPlaylist($event)" />
    <info-displayer />
  </div>
</template>

<script>
import MusicsManager from '@/services/MusicsManager'
import AudioManager from '@/services/AudioManager'
import NavBarMusic from '@/components/NavBarMusic.vue'
import ApiManager from '@/services/ApiManager'
import AddMusic from '@/components/AddMusic.vue'
import InfoDisplayer from '@/components/Utils/InfoDisplayer.vue'
import AddPlaylist from '@/components/AddPlaylist.vue'
import InfoManager from '@/services/InfoManager'

export default {
  components: {
    NavBarMusic,
    AddMusic,
    InfoDisplayer,
    AddPlaylist
  },
  name: 'PlaylistsView',
  data () {
    return {
      audio: Audio,
      playlists: [],
      musics: [],
      loadedMusic: null,
      playStatus: false,
      playMode: 'list',
      connect: false
    }
  },
  methods: {
    loadPlaylist () {
      ApiManager.getPlaylists().then(response => {
        this.playlists = response.data
        this.connect = true
      }).catch(() => {
        InfoManager.showInfo('Error while loading playlists', 'danger')
      })
    },
    playMusic (id) {
      if (this.audio.src !== ApiManager.getMusicSrc(id)) {
        this.audio.pause()
        AudioManager.pause()
        this.audio.src = ''
        AudioManager.setAudioSrc(this.audio.src)
        this.audio = new Audio()
        this.audio.src = id === null ? ApiManager.getMusicSrc(this.musics[0].id) : ApiManager.getMusicSrc(id)
        AudioManager.setAudioSrc(this.audio.src)
        this.audio.load()
        this.loadedMusic = id === null ? this.musics[0].id : id
      }
      const playPromise = this.audio.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.playStatus = true
        })
      }
    },
    pauseMusic () {
      this.playStatus = false
      this.audio.pause()
    },
    createPlaylist (playlist) {
      ApiManager.addPlaylist(playlist).then(response => {
        if (response.data.message === 'success') {
          this.loadPlaylist()
        } else {
          InfoManager.showInfo('Error while creating playlist', 'danger')
        }
      })
    },
    addPlaylist (name) {
      console.log(name)
    },
    enableRepeat () {
      this.playMode = this.playMode === 'repeat' ? 'list' : 'repeat'
    },
    enableRandom () {
      this.playMode = this.playMode === 'random' ? 'list' : 'random'
    },
    nextMusic () {
      this.loadedMusic = this.loadedMusic === this.musics[this.musics.length - 1].id ? this.musics[0].id : this.musics[this.musics.findIndex(music => music.id === this.loadedMusic) + 1].id
      this.playMusic(this.loadedMusic)
    },
    previousMusic () {
      this.loadedMusic = this.loadedMusic === this.musics[0].id ? this.musics[this.musics.length - 1].id : this.musics[this.musics.findIndex(music => music.id === this.loadedMusic) - 1].id
      this.playMusic(this.loadedMusic)
    },
    download () {
      document.getElementById('addMusicButton').click()
    }
  },
  watch: {
    audio: function (newValue) {
      AudioManager.setAudio(newValue)
      AudioManager.getAudio().addEventListener('ended', () => {
        switch (this.playMode) {
          case 'list':
            this.nextMusic()
            break
          case 'random':
            this.playMusic(this.musics[Math.floor(Math.random() * this.musics.length)].id)
            break
          case 'repeat':
            this.playMusic(this.loadedMusic)
            break
          default:
            this.playMusic(this.musics[0].id)
            break
        }
      })
      this.audio.addEventListener('pause', () => {
        this.pauseMusic()
      })
      this.audio.addEventListener('play', () => {
        this.playMusic(this.loadedMusic)
      })
    },
    musics: function (newValue) {
      MusicsManager.setMusics(newValue)
    },
    loadedMusic: function (newValue) {
      AudioManager.setLoadedMusic(newValue)
    },
    playStatus: function (newValue) {
      AudioManager.setPlayStatus(newValue)
    },
    playMode: function (newValue) {
      AudioManager.setPlayMode(newValue)
    }
  },
  mounted () {
    this.loadPlaylist()
    this.musics = MusicsManager.getMusics()
    this.audio = AudioManager.getAudio()
    this.playStatus = AudioManager.getPlayStatus()
    this.loadedMusic = AudioManager.getLoadedMusic()
    this.playMode = AudioManager.getPlayMode()
  }
}
</script>
