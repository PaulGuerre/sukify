<template>
  <button class="btn" type="button" @click="pause()"><i  class="fas fa-pause"></i></button>
</template>

<script>
export default {
  name: 'PlayMusic',
  props: ['audio'],
  methods: {
    pause () {
      this.$emit('pause')
    }
  }
}
</script>
