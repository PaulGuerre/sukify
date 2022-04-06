<template>
    <button class="btn btn-light text-success" type="button" @click="nextMusic"><i class="fas fa-angle-double-right"></i></button>
</template>

<script>
export default {
  methods: {
    nextMusic () {
      this.$emit('next')
    }
  }
}
</script>
