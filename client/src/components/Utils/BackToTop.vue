<template>
  <button id="backToTop" class="btn btn-floating btn-success btn-lg" @click="toTop()"><i class="fas fa-angle-up"></i></button>
</template>

<script>
export default {
  name: 'BackToTop',
  methods: {
    toTop () {
      window.scrollTo(0, 0)
    },
    onScroll () {
      if (window.scrollY > 100) {
        document.getElementById('backToTop').style.visibility = 'visible'
      } else {
        document.getElementById('backToTop').style.visibility = 'hidden'
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.onScroll()
    })
  }
}
</script>

<style>
#backToTop {
  visibility: hidden;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
