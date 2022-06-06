<template>
  <div class="prescription-container">
    <img class="prescription-background" :src="Background" />
    <div>
      <BaseCard class="prescription-card">
        <Sticker theme="blue-pink" class="prescription-title" big>
          Ordonnance
        </Sticker>
        <Title tag="h2" class="prescription-subtitle">Dr Tamalou</Title>
        <p>{{ prescription.intro }}</p>
        <div class="prescription-content">
          <img :src="icons.environment" />
          <p v-html="prescription.environment"></p>
          <img :src="icons.wish" />
          <p v-html="prescription.wish"></p>
        </div>
        <img class="prescription-stamp" :src="Stamp" />
        <Button class="prescription-button" @click="store.moveToNextStep">
          Compris !
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
      Stamp,
      Background,
    }
  },
  mounted() {
    this.prescription.intro = prescriptionText.intro

    this.prescription.environment = prescriptionText.environment.mer

    this.prescription.wish = getRandomFromArray(prescriptionText.wish.intro)
    this.prescription.wish += '<span>'
    this.prescription.wish += prescriptionText.wish[this.store.trip.wish]
    this.prescription.wish += '</span>'

    this.icons.environment = gameIcons['mer']
    this.icons.wish = gameIcons[this.store.trip.wish]
  },
}
</script>

<style lang="scss">
.prescription {
  &-container {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0;
    z-index: 10;

    > div {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
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

  &-subtitle {
    padding-bottom: 20px;
  }

  &-content {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    grid-gap: 16px;
    padding: 24px 0;

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
