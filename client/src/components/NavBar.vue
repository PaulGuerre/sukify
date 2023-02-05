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

    <div>
      <font-awesome-icon icon="fa-solid fa-music" :class="location === 'musics' ? 'navbar-assets assets-selected' : 'navbar-assets'" />
    </div>

    <div>
      <font-awesome-icon icon="fa-solid fa-rectangle-list" :class="location === 'playlists' ? 'navbar-assets assets-selected' : 'navbar-assets'" />
    </div>

    <template v-slot:append>
      <v-divider></v-divider>
      <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="navbar-logout-icon" />
    </template>
  </v-navigation-drawer>

  <v-app-bar v-else>
    <template v-slot:prepend>
      <img src="@/assets/logo.png" alt="logo" class="top-nav-app-logo" />
    </template>
    <v-spacer></v-spacer>

    <font-awesome-icon icon="fa-solid fa-music" :class="location === 'musics' ? 'top-nav-icon assets-selected' : 'top-nav-icon'" />

    <font-awesome-icon icon="fa-solid fa-rectangle-list" :class="location === 'playlists' ? 'top-nav-icon assets-selected' : 'top-nav-icon'" />

    <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="top-nav-icon" />
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBarMusic',
  props: {
    isMobile: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      location: this.$route.fullPath.slice(1)
    }
  },
  mounted () {
    this.$router.afterEach((to, from) => {
      this.location = to.fullPath.slice(1)
    })
  }
}
</script>

<style>
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
