<template>
  <div class="home" id="home">
    <AddMusicApi />
    <hr id="hr">
    <ListMusicApi />
  </div>
</template>

<script>
import AddMusicApi from '../components/AddMusicApi.vue'
import ListMusicApi from '../components/ListMusicsApi.vue'

export default {
  name: 'HomeView',
  components: {
    AddMusicApi,
    ListMusicApi
  }
}
</script>

<style>
#home {
  background-color: darkslategray;
}

#hr {
  color: white;
  margin: auto;
  margin-bottom: 4%;
  width: 80%;
  height: 5px;
  border-radius: 5px;
}
</style>
