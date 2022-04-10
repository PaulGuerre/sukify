<template>
  <div>
    <nav class="navbar navbar-expand-sm fixed-top bg-success">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand text-light">Home</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="text-light"><i class="fas fa-sliders-h"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <router-link to="/playlists" class="navbar-nav me-auto nav-link text-light">Playlists</router-link>
            <div class="progress">
              <div class="progress-bar bg-success placeholder placeholder-wave" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;" ></div>
            </div>&nbsp;
            <div class="d-flex btn-group btn-group-sm placeholder-wave">
            <button class="btn btn-light disabled placeholder"><i class="fas fa-angle-double-left"></i></button>&nbsp;
            <button class="btn btn-light disabled placeholder"><i class="fas fa-play"></i></button>&nbsp;
            <button class="btn btn-light disabled placeholder"><i class="fas fa-angle-double-right"></i></button>&nbsp;
            <button class="btn btn-light disabled placeholder"><i class="fas fa-redo"></i></button>&nbsp;
            <button class="btn btn-light disabled placeholder"><i class="fas fa-random"></i></button>
          </div>
        </div>
      </div>
    </nav>

    <div id="addMusic">
      <div class="input-group mb-3 placeholder-wave">
        <input type="text" class="form-control bg-dark placeholder" placeholder="Not connected" disabled>
        <button class="btn bg-light disabled placeholder" type="button"><i  class="fas fa-plus"></i></button>
      </div>
    </div>

    <div id="musicList">
      <div class="row row-cols-md-3 row-cols-lg-5">
        <div class="col" v-for="index in 5" :key="index">
          <div class="card placeholder-wave">
            <img src="../../assets/placeholder.png" class="card-img-top placeholder">
            <div class="card-body placeholder-wave">
              <span class="placeholder col-6 placeholder-lg"></span>
            </div>
            <div class="card-footer text-center placeholder-wave">
              <div class="btn-group btn-group-sm" role="group">
                <button class="btn btn-success disabled placeholder" type="button"></button>
                <button class="btn btn-warning disabled placeholder" type="button"></button>
                <button class="btn btn-danger disabled placeholder" type="button"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#addMusic {
  margin: 5%;
  margin-top: 12vh;
}

#musicList {
  background-color: #212529;
}

.card {
  margin: 5%;
  box-shadow: 5px 5px 5px #000000;
}
</style>
