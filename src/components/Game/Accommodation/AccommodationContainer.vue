<template>
  <GameLayout>
    <template #default>
      <AccommodationCardStack
        @swipe-right="validateAccommodation"
        :elements="elements"
      />
    </template>
  </GameLayout>
</template>

<script>
import { useStore } from '@/store'

import AccommodationCardStack from './AccommodationCardStack.vue'
import GameLayout from '@/components/GameLayout.vue'

export default {
  name: 'AccommodationContainer',
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  components: {
    AccommodationCardStack,
    GameLayout,
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    validateAccommodation() {
      if (!this.store.selected) {
        console.log('stp choisis un hébergement')
        return
      }

      this.store.trip.accommodation = this.store.selected
      this.store.selected = null

      console.log(this.store.trip.accommodation)
      this.store.collectPotentialIncidents(this.store.trip.accommodation)
      this.store.finishStep()
    },
  },
}
</script>
