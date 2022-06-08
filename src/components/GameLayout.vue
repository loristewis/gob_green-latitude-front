<template>
  <div class="game-layout-container">
    <header>
      <slot name="header">
        <Menu
          :displayScore="store.currentStep != 'postcard'"
          :score="store.score"
        />
      </slot>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>
      <PrescriptionReminder v-if="store.currentStep != 'postcard'" />
    </footer>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { Menu } from '@/components/lib'
import PrescriptionReminder from '@/components/Game/PrescriptionReminder.vue'

export default {
  name: 'GameLayout',
  components: {
    Menu,
    PrescriptionReminder,
  },
  setup() {
    const store = useStore()
    return {
      store,
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
