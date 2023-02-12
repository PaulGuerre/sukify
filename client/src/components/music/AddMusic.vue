<template>
  <v-card class="ma-2 pa-3">
    <v-row no-gutters justify="center">
      <v-col cols="auto">
        <input type="text" v-model="musicTitle" class="form-control input-field pa-2 ma-2" placeholder="Music title or URL" @keyup.enter="addMusic" />
      </v-col>
      <v-col cols="auto">
        <button class="login-btn pa-2 ma-2" type="button" @click="addMusic">Add music</button>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ApiManager from '@/services/ApiManager'

export default {
  name: 'AddMusic',
  data () {
    return {
      musicTitle: ''
    }
  },
  methods: {
    addMusic () {
      ApiManager.addMusic(this.musicTitle).then(response => {
        if (response.data.message === 'success') {
          ApiManager.getMusics().then(response => {
            this.$store.dispatch('setMusics', response.data)
          })
        }
      })
    }
  }
}
</script>

<style>
.input-field {
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
}

.login-btn {
  background-color: #1db954;
  color: white;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
}
</style>
