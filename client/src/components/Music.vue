<template>
    <div class="row mb-3">
        <div class="col-5 col-md-4 col-lg-3 text-start p-0">
            <img :src="'https://i.ytimg.com/vi/' + music.videoID + '/mqdefault.jpg'" class="img-fluid" style="border: 10px solid #424242; border-radius: 5px;" alt="Responsive image">
        </div>
        <div class="col-7 col-md-8 col-lg-9 fs-5 text-light text-truncate text-start row" style="background-color: #424242; border: 10px solid #424242; border-radius: 5px;">
            <span class="text-truncate col-12">{{ music.title }}</span>
            <div class="col-1 col-md-1 col-lg-1 btn-group btn-group-sm shadow-none" role="group" style="max-height: 30px;">
                <ToggleMusicButton :music=music />
            </div>
        </div>
    </div>
</template>

<script>
import ToggleMusicButton from './MusicButtons/ToggleMusicButton.vue'

export default {
  name: 'Music',
  props: { music: Object },
  components: { ToggleMusicButton }
}
</script>
