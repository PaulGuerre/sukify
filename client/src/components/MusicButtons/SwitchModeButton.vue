<template>
  <button :class="{ 'btn text-success bg-transparent': musicMode !== mode, 'btn btn-success text-dark': musicMode === mode }" type="button" @click="switchMode">
    <font-awesome-icon :icon="'fa-solid fa-' + mode" />
  </button>
</template>

<script>
import C from '../../constants/constants'

export default {
  name: 'SwitchModeButton',
  props: { mode: String },
  computed: {
    musicMode () {
      return this.$store.getters.musicMode
    }
  },
  methods: {
    switchMode () {
      this.$store.dispatch('setMusicMode', this.musicMode !== this.mode ? this.mode : C.NORMAL_MODE)
    }
  }
}
</script>
