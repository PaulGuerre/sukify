<template>
  <v-navigation-drawer
    v-if="!isMobile"
    rail
    permanent
  >
    <template v-slot:prepend>
      <img src="@/assets/logo.png" alt="logo" class="navbar-app-logo" />
      <v-divider></v-divider>
    </template>

    <font-awesome-icon icon="fa-solid fa-music" :class="location ? 'navbar-assets' : 'navbar-assets assets-selected'" @click="$router.push('/musics')" />
    <font-awesome-icon icon="fa-solid fa-rectangle-list" :class="location ? 'navbar-assets assets-selected' : 'navbar-assets'" @click="$router.push('/playlists')" />

    <template v-slot:append>
      <v-divider></v-divider>
      <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="navbar-logout-icon" @click="disconnect" />
    </template>
  </v-navigation-drawer>

  <v-app-bar v-else>
    <template v-slot:prepend>
      <img src="@/assets/logo.png" alt="logo" class="top-nav-app-logo" />
    </template>
    <v-spacer></v-spacer>

    <font-awesome-icon icon="fa-solid fa-music" :class="location ? 'top-nav-icon' : 'top-nav-icon assets-selected'" @click="$router.push('/musics')" />
    <font-awesome-icon icon="fa-solid fa-rectangle-list" :class="location ? 'top-nav-icon assets-selected' : 'top-nav-icon'" @click="$router.push('/playlists')" />
    <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="top-nav-icon" @click="disconnect" />
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBarMusic',
  data () {
    return {
      location: this.$route.name === 'playlists'
    }
  },
  methods: {
    disconnect () {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    getCurrentLocation () {
      this.location = this.$route.name
    }
  },
  watch: {
    $route (to, from) {
      this.location = to.name === 'playlists'
    }
  },
  computed: {
    isMobile () {
      return this.$store.getters.isMobile
    }
  }
}
</script>

<style scoped>
.navbar-app-logo {
  width: 40px;
  height: 40px;
  margin-top: 20%;
  margin-left: 10%;
  margin-right: 10%;
}

.navbar-logout-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-top: 30%;
  margin-bottom: 20%;
  margin-left: 15px;
  margin-right: 15px;
}

.navbar-assets {
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-top: 50%;
  margin-bottom: 50%;
  margin-left: 15px;
  margin-right: 15px;
}

.assets-selected {
  color: #00b849;
}

.top-nav-app-logo {
  width: 40px;
  height: 40px;
}

.top-nav-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 5%;
}
</style>
