<template>
  <GameLayout>
    <template #default>
      <ActivitiesSwiper :activities="availableActivities" />

      <Button
        main
        class="activities-main-button"
        :class="this.store.activitiesCount < 3 ? 'hidden' : ''"
        @click="finishStep"
      >
        Quel voyage !
      </Button>
    </template>
  </GameLayout>
</template>

<script>
import { useStore } from '@/store'

import { Button } from '@/components/lib'
import ActivitiesSwiper from '@/components/Game/Activities/ActivitiesSwiper.vue'
import GameLayout from '@/components/GameLayout.vue'

import EmptySlot from '@/assets/empty-slot.png'

export default {
  name: 'ActivitiesContainer',
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  components: {
    Button,
    ActivitiesSwiper,
    GameLayout,
  },
  data() {
    return {
      EmptySlot,
      isOpen: false,
      outcome: null,
      availableActivities: this.elements,
      buttonHidden: true,
    }
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    finishStep() {
      this.store.moveToNextStep()
    },
  },
}
</script>

<style lang="scss">
.activities-main-button {
  transition: opacity 0.2s;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
