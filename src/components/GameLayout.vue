<template>
  <div class="game-layout-container">
    <transition name="opacity">
      <ModalContainer v-if="store.modal" :key="modal"></ModalContainer>
    </transition>

    <header>
      <slot name="header">
        <Menu
          :displayScore="store.currentStep !== 'postcard'"
          :score="store.score"
        />
      </slot>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>
      <PrescriptionReminder v-if="store.currentStep !== 'postcard'" />
    </footer>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { modals } from '@/constants'
import { Menu } from '@/components/lib'

import PrescriptionReminder from '@/components/Game/PrescriptionReminder.vue'
import ModalContainer from '@/components/Game/Modals/ModalContainer.vue'

export default {
  name: 'GameLayout',
  components: {
    Menu,
    ModalContainer,
    PrescriptionReminder,
  },
  setup() {
    const store = useStore()

    if (!!store.dev)
      console.warn('Green Latitude : Mode développement activé dans le store')

    return {
      store,
    }
  },
  data() {
    return {
      modals,
    }
  },
}
</script>

<style lang="scss">
.game-layout-container {
  width: 100%;
  height: 100%;

  main {
    height: calc(100% - 150px);
  }
}
</style>
