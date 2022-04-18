<template>
  <div v-if="connect" class="home" id="home">
    <nav-bar-music v-on:updateShow="updateShow($event)"
      :showMusic="showMusic"
      :loadedMusic="loadedMusic"
      :loadedPlaylist="loadedPlaylist"
      :playStatus="playStatus"
      :audio="audio" v-on:play="playMusic($event)" v-on:pause="pauseMusic" v-on:playPlaylist="playPlaylist($event)"
      :playMode="playMode" v-on:repeat="enableRepeat" v-on:random="enableRandom" v-on:next="nextMusic" v-on:previous="previousMusic"
    />

    <add-music
      v-on:add="addMusic($event)" v-on:keyup.enter="download"
    />

    <hr id="hr">

    <music-list v-if="showMusic"
      :openedPlaylist="openedPlaylist"
      :playStatus="playStatus"
      :loadedMusic="loadedMusic"
      :audio="audio" v-on:play="playMusic($event)" v-on:pause="pauseMusic"
      :musics="musics" v-on:removeMusic="removeMusic($event)"
      :playlists="playlists" v-on:addMusicPlaylist="addMusicPlaylist"
      :showMusic="showMusic" v-on:removePlaylistMusic="removePlaylistMusic($event)"
    />

    <div v-else>
      <playlist-list :playlists="playlists" v-on:loadPlaylistMusic="openPlaylist($event)" v-on:editPlaylist="editPlaylist($event)" v-on:removePlaylist="removePlaylist($event)"
        :playStatus="playStatus"
        :loadedMusic="loadedMusic"
        :musics="musics"
        :audio="audio" v-on:play="playMusic($event)" v-on:playPlaylist="playPlaylist($event)" v-on:pause="pauseMusic"
        :loadedPlaylist="loadedPlaylist"
        :showMusic="showMusic"
      />
    </div>

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
import YoutubeApiManager from '@/services/YoutubeApiManager'
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
      }).catch(() => {
        InfoManager.showInfo('Error while loading musics', 'danger')
      })
    },
    loadPlaylistMusic (id) {
      ApiManager.getPlaylistMusics(id).then(response => {
        if (response.data.length > 0) {
          this.musics = response.data
          this.loadedPlaylist = id
        } else {
          this.musics = []
          InfoManager.showInfo('This playlist is empty', 'danger')
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
    addMusic (musicInput) {
      YoutubeApiManager.getVideo(musicInput).then(response => {
        const newMusic = { title: response.data.items[0].snippet.title, videoID: response.data.items[0].id.videoId }
        ApiManager.addMusic(newMusic).then(response => {
          if (response.data.message === 'success') {
            this.loadMusic()
          } else {
            InfoManager.showInfo('Error while adding music', 'danger')
          }
          document.getElementById('closeModal').click()
        })
      })
    },
    removeMusic (id) {
      ApiManager.removeMusic(id).then(response => {
        if (response.data.message === 'success') {
          this.musics = this.musics.filter(music => music.id !== id)
          if (id === this.loadedMusic) {
            this.nextMusic()
          }
        } else {
          InfoManager.showInfo('Error while removing music', 'danger')
        }
      })
    },
    removePlaylistMusic (ids) {
      ApiManager.removePlaylistMusic(ids.musicId, ids.playlistId).then(response => {
        if (response.data.message === 'success') {
          this.musics = this.musics.filter(music => music.id !== ids.musicId)
          if (ids.musicId === this.loadMusic) {
            this.nextMusic()
          }
        } else {
          InfoManager.showInfo('Error while removing playlist music', 'danger')
        }
      })
    },
    editPlaylist (playlistUpdate) {
      ApiManager.editPlaylist(playlistUpdate).then(response => {
        if (response.data.message === 'success') {
          this.playlists = this.playlists.map(playlist => {
            playlist.name = playlist.id === playlistUpdate.id ? playlistUpdate.name : playlist.name
            return playlist
          })
        } else {
          InfoManager.showInfo('Error while updating music', 'danger')
        }
      })
    },
    removePlaylist (id) {
      ApiManager.removePlaylist(id).then(response => {
        if (response.data.message === 'success') {
          this.playlists = this.playlists.filter(playlist => playlist.id !== id)
        } else {
          InfoManager.showInfo('Error while removing playlist', 'danger')
        }
      })
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
