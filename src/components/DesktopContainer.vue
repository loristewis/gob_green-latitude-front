<template>
  <div class="desktop-container">
    <div v-if="isTablet || isDesktop" class="left">
      <div>
        <img
          src="../assets/logo.svg"
          alt="Green Latitude - Ça va être le feu !"
        />
      </div>

      <div class="description">
        <p>
          <strong>Green latitude</strong> est un
          <strong>jeu mobile narratif satirique</strong>, qui simule
          l’organisation d’un voyage, avec pour objectif de maintenir un
          équilibre entre trois jauges : bien être, empreinte écologique et
          budget.
          <br />
          Notre objectif est de montrer qu’adopter un comportement plus
          écologique résulte toujours d’un
          <strong>processus décisionnel multifactoriel</strong>.
        </p>

        <p>
          Projet réalisé par Elsa Delmas, Loris Birkemeyer, Léa Kovarski, Marie
          Majou et Elie Nissen
        </p>
      </div>
    </div>

    <transition name="slide-in-out">
      <div class="phone-container slide-in-out">
        <slot></slot>
      </div>
    </transition>

    <div v-if="isDesktop" class="right">
      <div class="qr-code">
        <div class="image">
          <img src="" alt="" />
        </div>

        <p>Scannez ce QR code pour pouvoir jouer sur mobile !</p>
      </div>
    </div>
  </div>
</template>

<script>
import Pattern from '@/assets/pattern-transparent.png'

export default {
  name: 'DesktopContainer',
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      isDesktop: false,
      isTablet: false,
      Pattern,
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight

      this.isDesktop = this.window.width >= 1200
      this.isTablet = this.window.width > 736 && this.window.width < 1200
    },
  },
}
</script>

<style lang="scss">
.desktop-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 48px;
  height: 100%;
  width: 100%;
  padding: 0;

  @include screen-sm {
    padding: 0 48px;
  }

  .left,
  .right {
    max-width: 50%;
    flex-shrink: 1;

    p {
      font-family: var(--font-title);
      font-size: 1.1rem;
      color: var(--color-white);
    }
  }

  .left {
    img {
      max-width: 100%;
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

    .qr-code {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;
      width: min-content;
      padding: 32px;
      background-color: var(--color-teal-light);
      border-radius: 8px;
      text-align: center;
    }

    .image {
      background-color: var(--color-white);
      width: 192px;
      height: 192px;
    }
  }
}

.phone-container {
  position: relative;
  width: 100%;
  height: calc(100% + 1px);
  background-color: var(--color-beige-cool);
  flex-shrink: 0;
  overflow: hidden;

  > div {
    width: 100%;
    height: 100%;
  }

  @include screen-sm {
    height: 844px;
    width: 414px;
    max-height: 90vh;
    //max-width: 90%;
    border: 16px solid var(--color-white);
    border-radius: 24px;
    //max-width: 375px;
    //max-height: 800px;
  }
}
</style>
