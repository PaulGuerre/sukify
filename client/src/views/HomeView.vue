<template>
  <div v-if="connect" class="home" id="home">
    <nav-bar-music
      :audio="audio" @play="playMusic($event)" @playPlaylist="playPlaylist($event)" @pause="pauseMusic()"
      :loadedMusic="loadedMusic"
      :loadedPlaylist="loadedPlaylist"
      :playStatus="playStatus"
      :playMode="playMode" @updateMode="updateMode($event)" @musicAction="musicAction($event)" @updateShow="updateShow($event)"
      :showMusic="showMusic"
    />

    <add-music
      @loadMusic="loadMusic()" @keyup.enter="download()"
    />

    <hr id="hr">

    <music-list v-if="showMusic"
      :audio="audio" @play="playMusic($event)" @pause="pauseMusic()"
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
import AddMusic from '@/components/AddMusic.vue'
import MusicList from '@/components/MusicList.vue'
import PlaylistList from '@/components/PlaylistList.vue'

export default {
  name: 'HomeView',
  components: {
    NavBarMusic,
    InfoDisplayer,
    NotConnected,
    AddMusic,
    MusicList,
    PlaylistList
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
      openedPlaylist: null,
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
        if (this.loadedMusic === null && this.playlists.length > 0) {
          this.loadPlaylistMusic(this.playlists[0].id)
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
        this.audio.src = id === null ? ApiManager.getMusicSrc(this.musics[0].id) : ApiManager.getMusicSrc(id)
        this.audio.load()
        this.loadedMusic = id === null ? this.musics[0].id : id
        this.loadedPlaylist = this.showMusic && this.openedPlaylist === null ? null : this.loadedPlaylist
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
        this.musicAction('next')
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
    musicAction (action) {
      if (action === 'next') {
        this.loadedMusic = this.loadedMusic === this.musics[this.musics.length - 1].id ? this.musics[0].id : this.musics[this.musics.findIndex(music => music.id === this.loadedMusic) + 1].id
      } else if (action === 'previous') {
        this.loadedMusic = this.loadedMusic === this.musics[0].id ? this.musics[this.musics.length - 1].id : this.musics[this.musics.findIndex(music => music.id === this.loadedMusic) - 1].id
      } else {
        InfoManager.showInfo('Invalid action', 'danger')
      }
      this.playMusic(this.loadedMusic)
    },
    updateMode (newMode) {
      this.playMode = newMode
    },
    updateShow (show) {
      this.openedPlaylist = null
      if (show) {
        this.loadMusic()
      } else {
        this.loadPlaylist()
      }
      this.showMusic = show
    },
    download () {
      document.getElementById('addMusicButton').click()
    }
  },
  mounted () {
    this.loadPlaylist()
    this.audio.addEventListener('ended', () => {
      switch (this.playMode) {
        case 'list':
          this.musicAction('next')
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
  }
}
</script>

<style>
#home {
  background-color: #212529;
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
