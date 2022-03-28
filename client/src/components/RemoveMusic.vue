<template>
  <button class="btn btn-danger" type="button" @click="remove(id)"><i  class="fas fa-trash"></i></button>
</template>

<script>
import ApiManager from '@/services/ApiManager'

export default {
  name: 'RemoveMusic',
  props: ['id'],
  methods: {
    remove (id) {
      ApiManager.removeMusic(id).then(response => {
        if (response.data.message === 'success') {
          this.$emit('remove', id)
        }
      })
    }
  }
}
</script>
