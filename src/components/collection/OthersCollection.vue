<template>
  <Title tag="h1">Budget</Title>

  <Price v-for="index in 3" :key="index" :value="index"></Price>

  <Title tag="h1">Splash screen</Title>

  <div class="phone-container">
    <SplashScreen :infos="splash" />
  </div>

</template>

<script>
import { Title, Price } from './../lib/'
import SplashScreen from './../SplashScreen.vue'

import { splashScreens } from "./../../constants"

export default {
  name: 'OthersCollection',
  components: { Title, Price, SplashScreen },
  data() {
    return {
      splash: splashScreens.accommodation
    }
  }
}
</script>

<style scoped>
.phone-container {
  width: 375px;
  height: 800px;
}
</style>
