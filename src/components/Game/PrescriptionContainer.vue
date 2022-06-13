<template>
  <div class="prescription-container">
    <img class="prescription-background" :src="Background" alt="" />

    <div>
      <BaseCard class="prescription-card" title="Dr Tamalou">
        <Sticker theme="blue-pink" class="prescription-title" big>
          Ordonnance
        </Sticker>

        <p class="prescription-intro">{{ prescription.intro }}</p>

        <div class="prescription-content">
          <img :src="icons.environment" alt="" />

          <p v-html="prescription.environment"></p>

          <img :src="icons.wish" alt="" />

          <p v-html="prescription.wish"></p>
        </div>

        <img class="prescription-stamp" :src="Stamp" alt="" />

        <Button
          :isDisabled="this.buttonDisabled"
          class="prescription-button"
          @click="acceptPrescription"
        >
          Compris !
        </Button>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/store'

import Stamp from '@/assets/doctor-stamp.svg'
import Background from '@/assets/doctor-bg.png'

import { getRandomFromArray } from '@/helpers'

import { prescriptionText, gameIcons } from '@/constants'
import { BaseCard, Sticker, Title, Button } from '@/components/lib'

export default {
  name: 'PrescriptionContainer',
  components: {
    BaseCard,
    Sticker,
    Title,
    Button,
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  data() {
    return {
      prescription: {
        intro: '',
        environment: '',
        wish: '',
      },
      icons: {
        environment: '',
        wish: '',
      },
      buttonDisabled: false,
      Stamp,
      Background,
    }
  },
  mounted() {
    this.prescription.intro = prescriptionText.intro

    this.prescription.environment = getRandomFromArray(
      prescriptionText.environment.mer
    )

    this.prescription.wish = getRandomFromArray(prescriptionText.wish.intro)
    this.prescription.wish += '<span>'
    this.prescription.wish += prescriptionText.wish[this.store.trip.wish]
    this.prescription.wish += '</span>'

    this.icons.environment = gameIcons['mer']
    this.icons.wish = gameIcons[this.store.trip.wish]
  },
  methods: {
    acceptPrescription() {
      this.buttonDisabled = true

      this.store.audio.music.volume = 0.2
      this.store.audio.music.loop = true

      if (this.store.soundon) {
        this.store.audio.music.currentTime = 0
        this.store.audio.music.play()
      }
      setTimeout(() => {
        this.store.moveToNextStep()
      }, 2)
    },
  },
}
</script>

<style lang="scss">
.prescription {
  &-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    font-size: 0;
    z-index: 10;

    > div {
      display: flex;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      align-items: center;
      font-size: 16px;
    }
  }

  &-background {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  &-card {
    margin: 0 32px;
    animation: appear 1s ease-in-out;
  }

  &-title {
    position: absolute;
    top: -16px;
    left: -16px;
    transform: rotate(-3deg);
  }

  .name {
    margin-bottom: 16px !important;
  }

  &-content {
    display: grid;
    grid-template-columns: 64px auto;
    align-items: center;
    grid-gap: 16px;
    padding: 16px 0;

    img {
      width: 64px;
    }

    span {
      font-weight: 600;
      color: var(--color-black-soft);
    }
  }

  &-button {
    position: absolute;
    bottom: 8px;
    right: -16px;
  }

  &-stamp {
    transform: translateY(10px) rotate(-25deg) scale(1.2);
    opacity: 0.8;
  }
}
</style>
