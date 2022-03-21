<template>
  <button class="btn btn-danger" type="button" @click="remove(this.id)"><i  class="fas fa-trash"></i></button>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RemoveMusic',
  props: ['id'],
  methods: {
    remove (id) {
      axios.delete('http://localhost:3000/musics/' + id)
        .then(response => {
          console.log(response.message)
          this.$router.go(0)
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  }
}
</script>
