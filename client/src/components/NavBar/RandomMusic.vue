<template>
  <button v-if="playMode !== 'random'" class="btn btn-light text-success" type="button" @click="randomMode"><i class="fas fa-random"></i></button>
  <button v-else class="btn btn-success text-light border border-light" type="button" @click="randomMode"><i class="fas fa-random"></i></button>
</template>

<script>
export default {
  name: 'RandomMusic',
  props: ['playMode'],
  methods: {
    randomMode () {
      if (this.playMode === 'random') {
        this.$emit('random', 'list')
      } else {
        this.$emit('random', 'random')
      }
    }
  }
}
</script>
