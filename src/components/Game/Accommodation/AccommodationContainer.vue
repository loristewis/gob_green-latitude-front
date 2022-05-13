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
      console.log('select!')
      console.log(element)
      this.selected = element
    },
    validateAccommodation() {
      if (!this.selected) {
        console.log('stp choisis un hébergement')
        return
      }

      this.store.trip.accommodation = this.selected.attributes
      console.log(this.store.trip.accommodation)
      this.store.calculateScore()
      this.store.moveToNextStep()
    },
  },
}
</script>

<template>
  <h3>Hébergement</h3>

  <accommodation-card
    v-for="el in elements"
    @click="selectElement(el)"
    :selected="el === this.selected"
    :accommodation="el.attributes"
    :key="el.id"
  ></accommodation-card>

  <Button @click="validateAccommodation">Let's go</Button>
</template>

<style></style>
