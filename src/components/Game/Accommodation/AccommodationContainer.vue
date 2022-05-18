<template>
  <h3>Hébergement</h3>

  <AccommodationCardStack :elements="elements" />

  <Button main @click="validateAccommodation">Let's go</Button>
</template>

<script>
import { useStore } from './../../../store/index'
import { Button } from './../../lib'

import AccommodationCardStack from './AccommodationCardStack.vue'

export default {
  name: 'AccommodationContainer',
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  components: {
    Button,
    AccommodationCardStack,
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    validateAccommodation() {
      if (!this.selected) {
        console.log('stp choisis un hébergement')
        return
      }

      this.store.trip.accommodation = this.selected.attributes
      this.selected = null

      console.log(this.store.trip.accommodation)
      this.store.collectPotentialIncidents(this.store.trip.accommodation)
      this.store.finishStep()
    },
  },
}
</script>
