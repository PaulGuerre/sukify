<template>
  <div v-if="connect" class="home" id="home">
    <nav-bar-music
      :audio="audio" @play="playMusic($event)" @playPlaylist="playPlaylist($event)" @pause="pauseMusic()"
      :loadedMusic="loadedMusic"
      :loadedPlaylist="loadedPlaylist"
      :playStatus="playStatus"
      :playMode="playMode" @updateMode="updateMode($event)" @nextMusic="nextMusic()" @previousMusic="previousMusic()" @updateShow="updateShow($event)"
      :showMusic="showMusic"
    />

    <more-action
      @loadMusic="loadMusic()"
      @loadPlaylist="loadPlaylist()"
    />

    <music-list v-if="showMusic"
      :audio="audio" @play="playMusic($event)" @pause="pauseMusic()" @showPlaylists="updateShow(false)"
      :playlists="playlists"
      :musics="musics" @removeMusic="removeMusic($event)"
      :loadedMusic="loadedMusic"
      :playStatus="playStatus"
      :openedPlaylist="openedPlaylist"
      :showMusic="showMusic"
    />

    <playlist-list v-else
      :audio="audio" @playPlaylist="playPlaylist($event)" @pause="pauseMusic()"
      :playlists="playlists" @loadPlaylistMusic="openPlaylist($event)" @editPlaylist="editPlaylist($event)" @removePlaylist="removePlaylist($event)"
      :loadedPlaylist="loadedPlaylist"
      :playStatus="playStatus"
      :showMusic="showMusic"
      :openedPlaylist="openedPlaylist"
    />

    <back-to-top />

    <info-displayer />
  </div>

  <not-connected v-else />
</template>

<script>
import ApiManager from '@/services/ApiManager'
import InfoDisplayer from '@/components/Utils/InfoDisplayer.vue'
import NavBarMusic from '@/components/NavBarMusic.vue'
import NotConnected from '@/components/Utils/NotConnected.vue'
import InfoManager from '@/services/InfoManager'
import MusicList from '@/components/MusicList.vue'
import PlaylistList from '@/components/PlaylistList.vue'
import BackToTop from '@/components/Utils/BackToTop.vue'
import MoreAction from '../components/MoreAction.vue'

export default {
  name: 'HomeView',
  components: {
    NavBarMusic,
    InfoDisplayer,
    NotConnected,
    MusicList,
    PlaylistList,
    BackToTop,
    MoreAction
  },
  data () {
    return {
      audio: new Audio(),
      playlists: [],
      musics: [],
      loadedMusic: null,
      loadedPlaylist: null,
      playStatus: false,
      playMode: 'list',
      showMusic: false,
      openedPlaylist: '',
      connect: false
    }
  },
  methods: {
    loadPlaylist () {
      ApiManager.getPlaylists().then(response => {
        this.playlists = response.data
        this.playlists.forEach(playlist => {
          ApiManager.getPlaylistMusics(playlist.id).then(response => {
            playlist.videoID = response.data[0].videoID
          })
        })
        if (this.loadedPlaylist !== null) {
          this.loadPlaylistMusic(this.loadedPlaylist)
        }
        this.connect = true
      })
    },
    loadMusic () {
      ApiManager.getMusics().then(response => {
        this.musics = response.data
      })
    },
    loadPlaylistMusic (id) {
      ApiManager.getPlaylistMusics(id).then(response => {
        if (response.data.length > 0) {
          this.musics = response.data
          this.loadedPlaylist = id
        } else {
          this.musics = []
        }
      })
    },
    openPlaylist (id) {
      ApiManager.getPlaylistMusics(id).then(response => {
        if (response.data.length > 0) {
          this.musics = response.data
          this.loadedPlaylist = id
          this.showMusic = true
          this.openedPlaylist = id
        } else {
          this.musics = []
          InfoManager.showInfo('This playlist is empty', 'danger')
        }
      })
    },
    playMusic (id) {
      if (this.audio.src !== ApiManager.getMusicSrc(id)) {
        id = id === null ? this.musics[0].id : id
        this.audio.src = ApiManager.getMusicSrc(id)
        this.audio.load()
        this.loadedMusic = id
        this.loadedPlaylist = this.showMusic && this.openedPlaylist === '' ? null : this.loadedPlaylist
        this.setNavigatorMusic(id)
      }
      this.audio.play()
      this.playStatus = true
    },
    playPlaylist (playlistId) {
      playlistId = playlistId === null ? this.playlists[0].id : playlistId
      ApiManager.getPlaylistMusics(playlistId).then(response => {
        if (response.data.length > 0) {
          this.musics = response.data
          this.playMusic(this.musics[0].id)
          this.loadedPlaylist = playlistId
        } else {
          InfoManager.showInfo('This playlist is empty', 'danger')
        }
      })
    },
    pauseMusic () {
      this.playStatus = false
      this.audio.pause()
    },
    editPlaylist (playlistUpdate) {
      this.playlists = this.playlists.map(playlist => {
        playlist.name = playlist.id === playlistUpdate.id ? playlistUpdate.name : playlist.name
        return playlist
      })
    },
    removeMusic (id) {
      this.musics = this.musics.filter(music => music.id !== id)
      if (id === this.loadedMusic) {
        this.nextMusic()
      }
    },
    removePlaylist (id) {
      this.playlists = this.playlists.filter(playlist => playlist.id !== id)
      if (id === this.loadedPlaylist) {
        this.musics = []
        this.pauseMusic()
        this.loadedMusic = null
        this.loadedPlaylist = null
      }
    },
    nextMusic () {
      this.loadedMusic = this.loadedMusic === this.musics[this.musics.length - 1].id ? this.musics[0].id : this.musics[this.musics.findIndex(music => music.id === this.loadedMusic) + 1].id
      this.playMusic(this.loadedMusic)
    },
    previousMusic () {
      this.loadedMusic = this.loadedMusic === this.musics[0].id ? this.musics[this.musics.length - 1].id : this.musics[this.musics.findIndex(music => music.id === this.loadedMusic) - 1].id
      this.playMusic(this.loadedMusic)
    },
    updateMode (newMode) {
      this.playMode = newMode
    },
    updateShow (show) {
      this.openedPlaylist = ''
      if (show) {
        this.loadMusic()
      } else {
        this.loadPlaylist()
      }
      this.showMusic = show
    },
    setNavigatorMusic (id) {
      ApiManager.getMusic(id).then(response => {
        if ('mediaSession' in navigator) {
          const video0 = 'https://i.ytimg.com/vi/' + response.data.videoID + '/0.jpg'
          const video1 = 'https://i.ytimg.com/vi/' + response.data.videoID + '/1.jpg'
          const video2 = 'https://i.ytimg.com/vi/' + response.data.videoID + '/2.jpg'
          const video3 = 'https://i.ytimg.com/vi/' + response.data.videoID + '/3.jpg'
          const videoDefault = 'https://i.ytimg.com/vi/' + response.data.videoID + '/default.jpg'
          const mqdefault = 'https://i.ytimg.com/vi/' + response.data.videoID + '/mqdefault.jpg'
          const hqdefault = 'https://i.ytimg.com/vi/' + response.data.videoID + '/hqdefault.jpg'
          navigator.mediaSession.metadata = new MediaMetadata({
            title: response.data.title,
            artist: 'Sukify',
            artwork: [
              { src: video0, sizes: '480x360', type: 'image/jpg' },
              { src: video1, sizes: '120x90', type: 'image/jpg' },
              { src: video2, sizes: '120x90', type: 'image/jpg' },
              { src: video3, sizes: '120x90', type: 'image/jpg' },
              { src: videoDefault, sizes: '120x90', type: 'image/jpg' },
              { src: mqdefault, sizes: '320x180', type: 'image/jpg' },
              { src: hqdefault, sizes: '480x360', type: 'image/jpg' }
            ]
          })
        }
      })
    }
  },
  mounted () {
    this.loadPlaylist()
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      this.nextMusic()
    })
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      this.previousMusic()
    })
    this.audio.addEventListener('ended', () => {
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
  created () {
    if (sessionStorage.getItem('token') === null) {
      this.$router.push('/login')
    } else {
      ApiManager.compareToken(sessionStorage.getItem('token')).then(response => {
        if (response.data.message === 'error') {
          this.audio.src = ''
          this.$router.push('/login')
        }
      })
    }
  },
  updated () {
    ApiManager.compareToken(sessionStorage.getItem('token')).then(response => {
      if (response.data.message === 'error') {
        this.audio.src = ''
        this.$router.push('/login')
      }
    })
  }
}
</script>

<style>
#home {
  background-color: #303030;
}

#hr {
  color: white;
  margin: auto;
  margin-bottom: 4%;
  width: 80%;
  height: 5px;
  border-radius: 5px;
}
</style>
