<template>
  <v-menu>
      <template v-slot:activator="{ props }">
        <font-awesome-icon icon="fa-solid fa-plus" class="add-to-playlist-icon" v-bind="props" />
      </template>
      <v-list>
        <p v-for="playlist in playlists" :key="playlist" class="pa-3 playlist-list-item" @click="addMusicToPlaylist(playlist.id)">{{ playlist.name }}</p>
      </v-list>
    </v-menu>
</template>

<script>
import ApiManager from '@/services/ApiManager'

export default {
  name: 'AddToPlaylistButton',
  props: { musicId: Number },
  computed: {
    playlists () {
      return this.$store.getters.playlists
    }
  },
  methods: {
    addMusicToPlaylist (playlistId) {
      ApiManager.addMusicToPlaylist(this.musicId, playlistId)
    }
  }
}
</script>

<style>
.add-to-playlist-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 5px;
  padding-bottom: 0;
}

.add-to-playlist-icon:hover {
  color: #00b849;
}

.playlist-list-item {
  cursor: pointer;
}

.playlist-list-item:hover {
  color: #00b849;
}
</style>
