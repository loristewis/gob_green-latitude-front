<template>
  <div
    class="animated-background"
    :style="{
      backgroundImage: `url(${Pattern})`,
    }"
  ></div>
</template>

<script>
import Pattern from '@/assets/splash/pattern-tile.jpg'

export default {
  name: 'AnimatedBackground',
  data() {
    return {
      Pattern,
    }
  },
}
</script>

<style lang="scss">
.animated-background {
  background-size: 160px 160px;
  position: absolute;
  top: -50%;
  left: -50%;
  height: 200%;
  width: 200%;
  animation: 2.3s linear splash infinite;
}
</style>
