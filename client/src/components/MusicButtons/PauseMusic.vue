<template>
  <button class="btn" type="button" @click="pauseMusic"><i  class="fas fa-pause"></i></button>
</template>

<script>
export default {
  name: 'PlayMusic',
  props: ['audio'],
  methods: {
    pauseMusic () {
      this.$emit('pause')
    }
  }
}
</script>
