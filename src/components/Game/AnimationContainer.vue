<template>
  <div id="animation-container">
    <div
      v-if="store.currentAnimation === 'intro'"
      @click="store.moveToNextStep"
      id="animation-skip"
    >
      <p>Passer l'introduction</p>
      <ChevronRightIcon class="hero-icon" />
    </div>
    <video ref="video" id="animation-video" @ended="store.moveToNextStep" muted>
      <source :src="animation[store.currentAnimation]" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { ChevronRightIcon } from '@heroicons/vue/solid'

import Intro from '@/assets/animation/intro.mp4'
import Travel from '@/assets/animation/travel.mp4'
import End from '@/assets/animation/end.mp4'

export default {
  name: 'AnimationContainer',
  components: {
    ChevronRightIcon,
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  data() {
    return {
      animation: {
        intro: Intro,
        travel: Travel,
        end: End,
      },
    }
  },
  mounted() {
    // dév
    this.store.moveToNextStep()

    // // si on rejoue
    // if (this.store.skipIntro) {
    //   this.store.moveToNextStep()
    // } else {
    //   this.$refs.video.play()
    // }
  },
}
</script>

<style lang="scss">
#animation-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  #animation-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
  }

  #animation-skip {
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.7));
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1;
    color: var(--color-white);
    font-family: var(--font-title);
    font-size: 1.1em;
    font-weight: 600;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
