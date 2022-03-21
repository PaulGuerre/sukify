<template>
  <nav class="nav bg-success text-light">
    <router-link class="nav-link text-light route" to="/">Home</router-link>
  </nav>
  <router-view/>
</template>

<style>
body, html {
  background-color: darkslategray;
}

#app {
  background-color: darkslategray;
}
</style>
