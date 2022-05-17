<template>
  <div
    class="splash-screen-container"
    :style="{
      backgroundImage: `url(${Pattern})`,
    }"
  >
    <div class="splash-screen-content">
      <img :src="infos.image" alt="" />
      <BaseCard class="splash-screen-tagline">
        <Title>{{ infos.tagline }}</Title>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import { BaseCard, Title } from './lib'

import Pattern from './../assets/splash/pattern-tile.jpg'

export default {
  name: 'SplashScreen',
  props: ['infos'],
  components: {
    BaseCard,
    Title,
  },
  data() {
    return {
      Pattern,
    }
  },
}
</script>

<style lang="scss">
.splash-screen-container {
  background-size: 160px 160px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  text-align: center;

  .splash-screen-content {
    .splash-screen-tagline {
      width: 90%;
      margin: 0 auto;
      margin-top: -24px;
    }

    img {
      z-index: 1;
    }
  }
}
</style>
