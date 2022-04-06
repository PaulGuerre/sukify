<template>
    <button v-if="playMode !== 'repeat'" class="btn btn-light text-success" type="button" @click="repeatMode"><i class="fas fa-redo"></i></button>
    <button v-else class="btn btn-success text-light border border-light" type="button" @click="repeatMode"><i class="fas fa-redo"></i></button>
</template>

<script>
export default {
  name: 'RepeatMusic',
  props: ['playMode'],
  methods: {
    repeatMode () {
      if (this.playMode === 'repeat') {
        this.$emit('repeat', 'list')
      } else {
        this.$emit('repeat', 'repeat')
      }
    }
  }
}
</script>
