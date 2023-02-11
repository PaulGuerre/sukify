<template>
  <font-awesome-icon :icon="'fa-solid fa-' + mode" class="switch-mode-icon" :color="musicMode === mode ? 'green' : ''" @click="switchMode" />
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

<style>
.switch-mode-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 5px;
  padding-bottom: 0;
}

.switch-mode-icon:hover {
  color: #00b849;
}
</style>
