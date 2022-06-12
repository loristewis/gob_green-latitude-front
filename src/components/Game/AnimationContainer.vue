<template>
  <transition name="fade">
    <div id="animation-container">
      <div
        v-if="store.currentAnimation === 'intro'"
        @click="store.moveToNextStep"
        id="animation-skip"
      >
        <p>Passer l'introduction</p>
        <ChevronRightIcon class="hero-icon" />
      </div>
      <div
        v-if="store.currentAnimation === 'intro'"
        class="animation-intro-background"
      >
        <img :src="Background" alt="" />
      </div>
      <video
        ref="video"
        id="animation-video"
        @ended="videoEnded"
        :class="fadeOut ? 'fading' : ''"
        muted
      >
        <source :src="animation[store.currentAnimation]" type="video/mp4" />
      </video>
    </div>
  </transition>
</template>

<script>
import { useStore } from '@/store'
import { ChevronRightIcon } from '@heroicons/vue/solid'

import Background from '@/assets/doctor-bg.png'

import Intro from '@/assets/animation/intro.mp4'
import Travel from '@/assets/animation/travel.mp4'

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
      },
      Background,
      fadeOut: false,
    }
  },
  mounted() {
    if (this.store.skipIntro && this.store.currentAnimation === 'intro') {
      this.store.moveToNextStep()
    } else {
      this.$refs.video.play()
    }
  },
  methods: {
    videoEnded() {
      this.fadeOut = true
      setTimeout(() => {
        this.store.moveToNextStep()
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
#animation-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  transition: 1s;
  font-size: 0;
  z-index: 10;

  .animation-intro-background {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    pointer-events: none;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  #animation-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;

    &.fading {
      animation: fadeout 1s;
    }
  }

  #animation-skip {
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.7));
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1;
    color: var(--color-white);
    font-family: var(--font-title);
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
