<template>
  <div id="menu-container" :style="{ height: displayScore ? '110px' : '50px' }">
    <ScoreContainer v-if="displayScore" :score="score" />

    <div class="home-button-container">
      <IconButton
        @click="onClickHomeButton"
        :icon="HomeIcon"
        background-color="#cebea8"
        size="40"
      />
    </div>

    <transition name="opacity">
      <div
        v-if="modal"
        class="back-to-home-modal-container"
        :key="modal"
        @click="closeModal"
      >
        <div class="modal-backdrop" />

        <BaseCard class="back-to-home-modal" title="Retourner à l'accueil ?">
          <Button simple @click="quitGame">Valider</Button>

          <p @click="closeModal">Continuer la partie</p>
        </BaseCard>
      </div>
    </transition>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import router from '@/router'
import { useStore } from '@/store'

import ScoreContainer from '@/components/lib/scores/ScoreContainer.vue'
import { IconButton, Button, BaseCard, Title } from '@/components/lib'

import { HomeIcon } from '@heroicons/vue/solid'

export default {
  name: 'Menu',
  components: {
    ScoreContainer,
    IconButton,
    Button,
    BaseCard,
    Title,
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
      required: true,
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
      modal: false,
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
      if (this.route.name === 'game' && this.store.currentStep != 'postcard') {
        this.modal = true
      } else {
        router.push('/')
      }
    },
    quitGame() {
      this.store.resetState()
      router.push('/')
    },
    closeModal() {
      this.modal = false
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
  padding: 12px;
  box-sizing: content-box;

  @include screen-xs {
    padding: 20px;
  }

  .home-button-container {
    display: flex;
    justify-content: end;
    grid-row: 1 / 2;
    grid-column: 2 / 2;
  }
}

.back-to-home-modal-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  &.opacity-leave-active  {
    transition: opacity 0.4s;
  }

  .modal-backdrop {
    background-color: var(--color-beige-dark);
    position: absolute;
    inset: 0;
    opacity: 0.4;
    --opacity: 0.4;
    animation: fadein 0.4s;
  }

  .back-to-home-modal {
    text-align: center;
    position: absolute;
    width: 75%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: modal-appear 0.4s;

    .modal-title {
      padding-bottom: 16px;
    }

    p {
      cursor: pointer;
    }
  }
}

.back-to-home-modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>
