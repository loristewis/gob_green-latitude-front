<template>
  <div id="menu-container">
    <ScoreContainer v-if="displayScore" :score="score" />

    <div class="buttons-container">
      <div class="sound-button-container">
        <IconButton
          @click="store.toggleSound"
          :icon="store.soundon ? VolumeUpIcon : VolumeOffIcon"
          background-color="transparent"
          icon-color="#cebea8"
          size="40"
        />
      </div>

      <div class="home-button-container">
        <IconButton
          @click="onClickHomeButton"
          :icon="HomeIcon"
          background-color="#cebea8"
          size="40"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import router from '@/router'
import { useStore } from '@/store'

import ScoreContainer from '@/components/lib/scores/ScoreContainer.vue'
import { IconButton } from '@/components/lib'

import { HomeIcon, VolumeOffIcon, VolumeUpIcon } from '@heroicons/vue/solid'

export default {
  name: 'Menu',
  components: {
    ScoreContainer,
    IconButton,
  },
  props: {
    score: {
      type: Object,
      default: () => {
        return {
          budget: 13,
          wellness: 6,
          pollution: 0,
        }
      },
    },
    displayScore: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      router,
      HomeIcon,
      VolumeOffIcon,
      VolumeUpIcon,
    }
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    return {
      store,
      route,
    }
  },
  methods: {
    onClickHomeButton() {
      console.log('backtohome')
      if (this.route.name === 'game' && this.store.currentStep !== 'postcard') {
        this.store.modal = 'home'
      } else {
        router.push('/')
      }
    },
  },
}
</script>

<style lang="scss">
#menu-container {
  position: unset;
  display: grid;
  grid-template-columns: 1fr 72px;
  grid-gap: 8px 16px;
  height: 110px;
  padding: 12px;
  box-sizing: content-box;

  @include screen-xs {
    padding: 20px;
  }

  .buttons-container {
    display: flex;
    justify-content: end;
    grid-row: 1 / 2;
    grid-column: 2 / 2;

    // to do: fix
    .sound-button-container {
      svg {
        fill: #cebea8;
      }
    }
  }
}
</style>
