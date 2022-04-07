<template>
  <button class="btn btn-light text-success" type="button" @click="previousMusic"><i class="fas fa-angle-double-left"></i></button>
</template>

<script>
export default {
  name: 'PreviousMusicButton',
  methods: {
    previousMusic () {
      this.$emit('previous')
    }
  }
}
</script>
