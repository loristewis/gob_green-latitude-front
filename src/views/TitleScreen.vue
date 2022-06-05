<template>
  <div
    class="title-screen-container"
    :style="{
      backgroundImage: `url(${Pattern})`,
    }"
  >
    <img id="main-logo" :src="Logo" alt="Green Latitude" />
    <div class="title-screen-buttons">
      <div class="title-screen-buttons--secondary">
        <Button small :chevron="false" @click="router.push('/memories')">
          Souvenirs
        </Button>
        <Button small :chevron="false" @click="router.push('/about')">
          À propos
        </Button>
      </div>
      <Button class="title-screen-buttons--start" @click="router.push('/game')">
        Commencer la partie
      </Button>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { Button } from '@/components/lib'

import Pattern from '@/assets/splash/pattern-tile.jpg'
import Logo from '@/assets/green-latitude.svg'

export default {
  name: 'TitleScreen',
  components: {
    Button,
  },
  data() {
    return {
      router,
      Pattern,
      Logo,
    }
  },
}
</script>

<style lang="scss">
.title-screen-container {
  background-size: 160px 160px;
  width: 100%;
  height: 100%;
  padding: 20px;

  #main-logo {
    width: 100%;
    padding-top: 25vh;
  }

  .title-screen-buttons {
    position: absolute;
    bottom: 48px;
    width: 100%;

    &--secondary {
      position: absolute;
      left: -42px;
      bottom: 62px;
    }

    &--start {
      position: absolute;
      right: -16px;
      bottom: 0;
      margin: 0;
    }
  }
}
</style>
