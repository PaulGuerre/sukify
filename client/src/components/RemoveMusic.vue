<template>
  <button class="btn btn-danger" id="removeButton" type="button" @click="remove(id)"><i  class="fas fa-trash"></i></button>
</template>

<script>
import ApiManager from '@/services/ApiManager'

export default {
  name: 'RemoveMusic',
  props: ['id'],
  methods: {
    remove (id) {
      ApiManager.removeMusic(id)
      this.$emit('remove', id)
    }
  }
}
</script>
