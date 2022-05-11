<script>
import { useStore } from './../../store/index'

export default {
  name: 'AnimationContainer',
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  mounted() {
    // on choisira la bonne anim en fonction de l'étape:
    // store.currentStep.split('-')[1]

    const video = document.getElementById('animation-container')
    video.src =
      'https://github.com/oliphant0803/animal_crossing/raw/main/animal_crossing_friends.mp4'
    video.play()
  },
}
</script>

<template>
  <video
    id="animation-container"
    @ended="store.moveToNextStep"
    width="500"
    controls
    muted
  >
    <source src="" type="video/mp4" />
  </video>
</template>
