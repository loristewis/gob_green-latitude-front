<template>
  <transition name="fade">
    <div class="animation-container" @click="skipAnimation">
      <div class="animation-skip">
        <p v-if="store.currentAnimation === 'intro'">Passer l'introduction</p>

        <p v-else-if="store.currentAnimation === 'travel'">Passer à la suite</p>

        <ChevronRightIcon class="hero-icon" />
      </div>

      <div class="animation-background" :style="backgroundStyle">
        <img
          v-if="backgroundImage && showBackgroundImage"
          :src="backgroundImage"
          alt=""
        />
      </div>

      <video
        ref="video"
        class="animation-video"
        @play="videoStarted"
        @ended="videoEnded"
        @click="$refs.video.play()"
        :class="fadeOut ? 'fading' : ''"
        playsinline
      >
        <source :src="animation[store.currentAnimation]" type="video/mp4" />
      </video>
    </div>
  </transition>
</template>

<script>
import { useStore } from '@/store'
import { ChevronRightIcon } from '@heroicons/vue/solid'

import BackgroundIntro from '@/assets/doctor-bg.png'
import BackgroundTravel from '@/assets/depart27.jpeg'

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
      BackgroundIntro,
      fadeOut: false,
      showBackgroundImage: false,
    }
  },
  mounted() {
    if (this.store.currentAnimation === 'travel') {
      if (this.store.soundon) {
        this.store.audio.splash.play()
      }
    }
    if (this.store.skipIntro && this.store.currentAnimation === 'intro') {
      this.store.moveToStep('prescription')
    } else {
      this.$refs.video.play()
    }
  },
  computed: {
    backgroundImage() {
      if (this.store.currentAnimation === 'intro') return BackgroundIntro

      return null
    },
    backgroundStyle() {
      if (this.store.currentAnimation === 'intro')
        return {
          backgroundColor: '#1F1F1F',
        }

      return null
    },
  },
  methods: {
    videoStarted() {
      setTimeout(() => {
        this.showBackgroundImage = true
      }, 2000)
    },
    videoEnded() {
      this.fadeOut = true

      setTimeout(() => {
        this.store.moveToNextStep()
      }, 1000)
    },
    skipAnimation() {
      if (this.store.currentAnimation === 'intro') {
        this.store.moveToStep('prescription')
      } else if (this.store.currentAnimation === 'travel') {
        this.store.moveToStep('incident')
      }
    },
  },
}
</script>

<style lang="scss">
.animation-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  transition: 1s;
  font-size: 0;
  z-index: 10;

  .animation-background {
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

  .animation-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;

    &.fading {
      animation: fadeout 1s;
    }
  }

  .animation-skip {
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
