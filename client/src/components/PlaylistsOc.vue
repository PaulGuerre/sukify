<template>
  <div id="playlists">
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offCanvasPlaylists" >
      <div class="offcanvas-header">
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        <!-- HEADER -->
      </div>
      <div class="offcanvas-body">
      <!-- BODY -->
      </div>
    </div>
    <button v-if="connect" type="button" class="btn btn-success" data-bs-toggle="offcanvas" data-bs-target="#offCanvasPlaylists">Playlists</button>
    <button v-else type="button" class="btn btn-success placeholder placeholder-wave" >Playlists</button>
  </div>
</template>

<script>
export default {
  name: 'PlaylistsOc',
  props: ['connect']
}
</script>

<style>
#playlists {
  text-align: center;
  margin-bottom: 4%;
}

#offCanvasPlaylists {
  background-color: #212529;
}
</style>
