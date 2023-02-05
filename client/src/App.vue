<template>
  <v-app theme="dark">
    <v-layout>
      <player v-if="!isLogin" :isMobile=isMobile />
      <nav-bar v-if="!isLogin" :isMobile=isMobile />
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
.v-main {
  height: 100vh;
  background-color: #303030;
}
</style>

<script>
import NavBar from '@/components/NavBar.vue'
import ApiManager from '@/services/ApiManager'
import Player from './components/Player.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Player
  },
  data () {
    return {
      isLogin: this.$route.name === 'login',
      isMobile: window.innerWidth < 768
    }
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
  mounted () {
    this.$router.afterEach((to, from) => {
      this.isLogin = to.name === 'login'
    })
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768
    })
  },
  updated () {
    this.checkTokenAndRedirect()
  }
}
</script>
