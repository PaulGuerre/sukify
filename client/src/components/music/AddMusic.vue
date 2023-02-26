<template>
  <v-card class="ma-2 pa-3">
    <v-row no-gutters justify="center">
      <v-col cols="auto">
        <input type="text" v-model="musicTitle" class="form-control input-field pa-2 ma-2" placeholder="Music title or URL" @keyup.enter="addMusic" />
      </v-col>
      <v-col cols="auto">
        <button class="add-music-btn pa-2 ma-2" type="button" @click="addMusic">Add music</button>
      </v-col>
    </v-row>
  </v-card>
  <info-manager ref="info" />
</template>

<script>
import ApiManager from '@/services/ApiManager'
import InfoManager from '@/components/InfoManager.vue'

export default {
  name: 'AddMusic',
  components: {
    InfoManager
  },
  data () {
    return {
      musicTitle: ''
    }
  },
  methods: {
    addMusic () {
      ApiManager.addMusic(this.musicTitle).then((response) => {
        this.$refs.info.showSuccess(response.data.message)
        this.musicTitle = ''
        ApiManager.getMusics().then(response => {
          this.$store.dispatch('setMusics', response.data)
        })
      })
    }
  }
}
</script>

<style scoped>
.input-field {
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
  min-width: 500px;
}

.add-music-btn {
  background-color: #1db954;
  color: white;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
}
</style>
