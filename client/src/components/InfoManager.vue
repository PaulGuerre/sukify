<template>
  <v-snackbar v-model="snackbar.show" location="top right" :color="snackbar.color">
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'InfoManager',
  data () {
    return {
      snackbar: {
        show: false,
        message: '',
        color: ''
      }
    }
  },
  methods: {
    showSuccess (message) {
      this.snackbar.show = true
      this.snackbar.message = message
      this.snackbar.color = 'success'
    },
    showError (message) {
      this.snackbar.show = true
      this.snackbar.message = message
      this.snackbar.color = 'error'
    },
    showSnackbar (message, color) {
      this.snackbar.show = true
      this.snackbar.message = message
      this.snackbar.color = color || 'info'
    }
  }
}
</script>
