<template>
  <div class="splash-screen-container">
    <AnimatedBackground />

    <div class="splash-screen-content">
      <img :src="infos.image" alt="" />

      <CardContainer class="splash-screen-tagline">
        <Title>{{ infos.tagline }}</Title>
      </CardContainer>
    </div>
  </div>
</template>

<script>
import { AnimatedBackground, CardContainer, Title } from '@/components/lib'

import Pattern from '@/assets/splash/pattern-tile.jpg'

export default {
  name: 'SplashScreen',
  props: ['infos'],
  components: {
    AnimatedBackground,
    CardContainer,
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
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  text-align: center;
  overflow: hidden;
  z-index: 10000;

  .splash-screen-content {
    .splash-screen-tagline {
      width: 90%;
      margin: -24px auto 0;
      padding: 12px 16px;
    }

    img {
      z-index: 1;
    }
  }
}
</style>
