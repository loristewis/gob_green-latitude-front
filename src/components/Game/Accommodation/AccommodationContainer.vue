<script>
import { useStore } from './../../../store/index'

import Button from './../../lib/Button.vue'
import AccommodationCard from './AccommodationCard.vue'

export default {
  name: 'AccommodationContainer',
  props: ['elements'],
  components: {
    Button,
    AccommodationCard,
  },
  data() {
    return {
      selected: null,
    }
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    selectElement(element) {
      this.selected = element
    },
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

<template>
  <accommodation-card
    v-for="el in elements"
    @click="selectElement(el)"
    :selected="el === this.selected"
    :accommodation="el.attributes"
    :key="el.id"
  ></accommodation-card>

  <Button main @click="validateAccommodation">Let's go</Button>
</template>

<style></style>
