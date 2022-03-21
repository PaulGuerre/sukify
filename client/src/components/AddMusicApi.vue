<template>
  <div id="addUser">
      <button @click="addMusic()">Add Music</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: [],
      errors: []
    }
  },
  methods: {
    addMusic () {
      axios.post('http://localhost:3000/dl', {
        url: 'https://youtu.be/dQw4w9WgXcQ',
        title: 'RickRoll'
      })
        .then(response => {
          console.log('Music send')
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  }
}
</script>
