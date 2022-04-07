<template>
  <div>
    <button v-if="connect" class="btn btn-success rounded-pill" type="button" id="musicLevelButton" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"><i class="fas fa-music"></i></button>
    <button v-else class="btn btn-success rounded-pill placeholder placeholder-wave" type="button" id="musicLevelButton"><i class="fas fa-music"></i></button>
    <div class="offcanvas offcanvas-bottom bg-dark text-success" tabindex="-1" id="offcanvasNavbar">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Music level</h5>
        <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        <input type="range" class="form-range" min="0.0" max="1.0" step="0.1" v-model="musicLevel" id="customRange1">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['connect', 'audio'],
  data () {
    return {
      musicLevel: 0.5
    }
  },
  watch: {
    musicLevel (newValue) {
      this.$emit('volume', newValue)
    }
  }
}
</script>

<style>
#musicLevelButton {
  position: fixed;
  top: 50%;
  right: 1%;
}

#offcanvasNavbar {
  height: 10em;
}

input[type=range]::-webkit-slider-thumb {
    background: #00b74a;
}
input[type=range]::-moz-range-thumb {
    background: #00b74a;
}
input[type=range]::-ms-thumb {
    background: #00b74a;
}

input[type=range]::-webkit-slider-thumb:hover {
    background: #00b74a;
}
input[type=range]::-moz-range-thumb:hover {
    background: #00b74a;
}
input[type=range]::-ms-thumb:hover {
    background: #00b74a;
}
</style>
