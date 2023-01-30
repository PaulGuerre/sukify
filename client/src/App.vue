<template>
  <NavBar v-if="$route.name !== 'login'" />
  <router-view/>
  <!-- ADD COMPONENT -->
  <!-- FUTUR MUSIC PLAYER COMPONENT -->
</template>

<style>
body, html {
  background-color: #303030;
}

#app {
  background-color: #303030;
  overflow-x: hidden;
}
</style>

<script>
import NavBar from '@/components/NavBar.vue'
import ApiManager from '@/services/ApiManager'

export default {
  name: 'App',
  components: {
    NavBar
  },
  methods: {
    checkTokenAndRedirect () {
      if (sessionStorage.getItem('token') === null) {
        this.$router.push('/login')
      } else {
        ApiManager.compareToken(sessionStorage.getItem('token')).then(response => {
          if (response.data.message === 'error') {
            this.$router.push('/login')
          }
        })
      }
    }
  },
  created () {
    this.checkTokenAndRedirect()
  },
  updated () {
    this.checkTokenAndRedirect()
  }
}
</script>
