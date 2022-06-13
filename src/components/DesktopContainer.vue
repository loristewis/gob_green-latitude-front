<template>
  <div class="desktop-container">
    <div v-if="isTablet || isDesktop" class="left">
      <div>
        <img :src="GreenLatitude" alt="Green Latitude - Ça va être le feu !" />
      </div>

      <div class="description box">
        <p>
          Vous êtes fatigué·e, stressé·e… Il est grand temps de prendre des
          vacances !
        </p>
        <p>
          Embarquez dans une aventure où vous aurez à équilibrer votre niveau de
          stress, votre budget et votre impact écologique !
        </p>

        <p class="small">
          — Projet réalisé par Elsa Delmas, Loris Birkemeyer, Léa Kovarski,
          Marie Majou et Elie Nissen
        </p>
      </div>
    </div>

    <transition name="slide-in-out">
      <div class="phone-container slide-in-out">
        <slot></slot>
      </div>
    </transition>

    <div v-if="isDesktop" class="right">
      <div class="qr-code box">
        <div class="image">
          <img :src="Qrcode" alt="" />
        </div>

        <p class="small">Scannez ce QR code pour pouvoir jouer sur mobile !</p>
      </div>

      <img
        :src="Gobelins"
        alt="Gobelins, l'école de l'image"
        class="logo-gobelins"
      />
    </div>
  </div>
</template>

<script>
import GreenLatitude from '@/assets/green-latitude.png'
import Pattern from '@/assets/pattern-transparent.png'
import Qrcode from '@/assets/unitag_qrcode_standard.png'
import Gobelins from '@/assets/Logos_Gobelins_CCI.png'
import { screenSize } from '@/mixins'

export default {
  name: 'DesktopContainer',
  mixins: [screenSize],
  data() {
    return {
      GreenLatitude,
      Pattern,
      Qrcode,
      Gobelins,
    }
  },
}
</script>

<style lang="scss">
.desktop-container {
  height: 100%;
  width: 100%;
  padding: 0;

  @include screen-sm {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    padding: 0 48px;

    .left {
      display: block;
    }
  }

  @include screen-desktop {
    grid-template-columns: 1fr auto 1fr;
  }

  .left,
  .right {
    p {
      font-family: var(--font-text);
      font-weight: var(--font-medium);
      color: var(--color-white);

      &:not(.small) {
        font-size: 1.1rem;
      }
    }

    .box {
      max-width: 400px;
      padding: 32px;
      background-color: var(--color-teal-light);
      border-radius: 32px;
    }
  }

  .left {
    min-width: 0;
    max-width: 100%;

    img {
      width: 100%;
      max-width: 400px;
    }

    .description {
      margin-top: 96px;

      p:not(:first-child) {
        margin-top: 24px;
      }
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    img {
      max-width: 100%;
    }

    .qr-code {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;
      width: min-content;
      text-align: center;
    }

    .image {
      background-color: var(--color-white);
      width: 192px;
      height: 192px;
    }

    .logo-gobelins {
      position: fixed;
      right: 40px;
      bottom: 32px;
      width: 120px;
      z-index: -1;
    }
  }
}

.phone-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--color-beige-cool);
  flex-shrink: 0;
  overflow: hidden;

  > div {
    width: 100%;
    height: 100%;
  }

  @include screen-sm {
    height: 844px;
    width: 480px;
    max-height: 90vh;
    border: 16px solid var(--color-white);
    border-radius: 24px;
  }
}
</style>
