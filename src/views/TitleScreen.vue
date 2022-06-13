<template>
  <div
    class="title-screen-container"
    :style="{
      backgroundImage: `url(${Pattern})`,
    }"
  >
    <AnimatedBackground />
    <img class="main-logo" :src="Logo" alt="Green Latitude" />

    <div class="title-screen-buttons">
      <div class="title-screen-buttons--secondary">
        <Button small :chevron="false" @click="router.push('/memories')">
          Souvenirs
        </Button>

        <Button small :chevron="false" @click="router.push('/about')">
          À propos
        </Button>
      </div>

      <div class="title-screen-buttons--start">
        <Button suitcase :chevron="false" @click="newGame">
          Commencer la partie
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { useStore } from '@/store'
import { Button, AnimatedBackground } from '@/components/lib'

import Pattern from '@/assets/splash/pattern-tile.jpg'
import Logo from '@/assets/green-latitude.svg'

export default {
  name: 'TitleScreen',
  components: {
    Button,
    AnimatedBackground,
  },
  data() {
    return {
      router,
      Pattern,
      Logo,
    }
  },
  setup() {
    const store = useStore()

    return {
      store,
    }
  },
  methods: {
    newGame() {
      this.store.resetState()
      router.push('/game')
    },
  },
}
</script>

<style lang="scss">
.title-screen-container {
  display: flex;
  flex-direction: column;
  background-size: 160px 160px;
  width: 100%;
  height: 100%;
  padding: 48px 0;

  .main-logo {
    flex-grow: 1;
    flex-shrink: 1;
    max-height: 100%;
    width: 100%;
    max-width: 500px;
    margin: auto;
    padding: 0 24px;
  }

  .title-screen-buttons {
    width: 100%;

    .button-container {
      margin: 16px 0;
    }

    &--secondary {
      transform: translateX(-24px);
    }

    &--start {
      transform: translateX(48px);

      .button-container {
        margin-left: auto;

        > div {
          padding: 0 48px;
        }
      }
    }
  }
}
</style>
