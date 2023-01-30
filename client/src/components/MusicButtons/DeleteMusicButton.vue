<template>
  <button class="btn text-success bg-transparent" type="button" @click="deleteMusic">
    <font-awesome-icon icon='fa-solid fa-trash' />
  </button>
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
