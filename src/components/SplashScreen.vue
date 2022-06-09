<template>
  <div class="splash-screen-container" @click="store.exitSplashScreen">
    <AnimatedBackground />

    <div class="splash-screen-content" :class="infos.type">
      <img :src="infos.image" alt="" />

      <CardContainer class="splash-screen-tagline">
        <Title>{{ infos.tagline }}</Title>
      </CardContainer>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/store'
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
  setup() {
    const store = useStore()
    return {
      store,
    }
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
      width: 240px;
      top: 8px;
    }

    &.transportation {
      img {
        top: 12px;
        transform: rotate(12deg);
      }
    }

    &.activities {
      img {
        width: 200px;
        top: 24px;
      }
    }
  }
}
</style>
