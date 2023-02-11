<template>
  <font-awesome-icon icon="fa-solid fa-trash" class="delete-music-icon" @click="deleteMusic" />
</template>

<script>
import ApiManager from '@/services/ApiManager'

export default {
  name: 'DeleteMusicButton',
  props: { musicId: Number },
  computed: {
    musics () {
      return this.$store.getters.musics
    }
  },
  methods: {
    deleteMusic () {
      ApiManager.deleteMusic(this.musicId)
      this.$store.dispatch('deleteMusic', this.musicId)
    }
  }
}
</script>

<style>
.delete-music-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 5px;
  padding-bottom: 0;
}

.delete-music-icon:hover {
  color: #ff5252;
}
</style>
