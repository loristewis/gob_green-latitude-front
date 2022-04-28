<template>
  <div class="home-button-container">
    <HomeIcon class="hero-icon" />
  </div>
</template>

<script>
import { HomeIcon } from '@heroicons/vue/solid'

export default {
  name: 'HomeButton',
  components: {
    HomeIcon,
  },
}
</script>

<style scoped>
.home-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #cebea8;
}
</style>
