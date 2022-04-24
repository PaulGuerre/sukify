<template>
  <div>
    <nav class="navbar navbar-expand-sm fixed-top" style="background-color: #212121">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand text-success">Sukify</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="text-light"><i class="fas fa-sliders-h"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="container-fluid">
            <div class="row">
              <button class="btn btn-link text-success border-0 col-6 col-md-2 col-lg-1 disabled" style="background-color: #212121">Playlists</button>
              <button class="btn btn-link text-success border-0 col-6 col-md-2 col-lg-1 disabled" style="background-color: #212121">Musics</button>
            </div>
          </div>
          <div class="d-flex btn-group btn-group-sm border border-success placeholder-wave" role="group">
            <button class="btn btn-light text-success disabled placeholder" style="background-color: #212121" type="button"><i class="fas fa-angle-double-left"></i></button>&nbsp;
            <button class="btn btn-light text-success disabled placeholder" style="background-color: #212121" type="button"><i class="fas fa-play"></i></button>&nbsp;
            <button class="btn btn-light text-success disabled placeholder" style="background-color: #212121" type="button"><i class="fas fa-angle-double-right"></i></button>&nbsp;
            <button class="btn btn-light text-success disabled placeholder" style="background-color: #212121" type="button"><i class="fas fa-redo"></i></button>&nbsp;
            <button class="btn btn-light text-success disabled placeholder" style="background-color: #212121" type="button"><i class="fas fa-random"></i></button>
          </div>
        </div>
      </div>
    </nav>

    <button id="addButton" class="btn btn-success btn-floating btn-lg disabled placeholder placeholder-wave" type="button"><i class="fas fa-plus"></i></button>

    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-6" style="margin-top: 10vh; margin-right: 2%; margin-left: 2%;">
      <div class="col" v-for="index in 5" :key="index">
        <div class="card text-success mb-4 shadow-lg" style="background-color: #424242">
          <img src="https://i.ytimg.com/vi/xN6LFM4CkWI/mqdefault.jpg" class="card-img-top placeholder placeholder-wave">
          <div class="card-img-overlay placeholder-wave">
            <h5 class="card-title fs-3 text-truncate placeholder col-7"></h5><br />
            <h6 class="card-subtitle text-white placeholder col-5"></h6>
          </div>
          <div class="card-footer border-0 text-center">
            <div class="btn-group btn-group-sm placeholder-wave" role="group">
              <button class="btn btn-success disabled placeholder" type="button"><i class="fas fa-play"></i></button>
              <button class="btn btn-warning disabled placeholder" type="button" ><i class="fas fa-edit"></i></button>
              <button class="btn btn-danger disabled placeholder" type="button"><i class="fas fa-trash-alt"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#addButton {
  position: fixed;
  right: 1%;
  top: 50%;
  opacity: 0.5;
  z-index: 2;
}
.card-img-top {
  object-fit: cover;
  height:230px;
  filter: blur(3px);
  background-color: black;
  opacity: 0.3;
}
</style>
