<script>
import { useStore } from './../../../store/index'

import TransportationCard from './TransportationCard.vue'

export default {
  name: 'TransportationContainer',
  props: ['elements'],
  components: {
    TransportationCard,
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
    validateTransportation() {
      if (!this.selected) {
        console.log('stp choisis un transport')
        return
      }

      this.store.trip.transportation = this.selected.attributes
      console.log(this.store.trip.transportation)
      this.store.calculateScore()
      this.store.moveToNextStep()
    },
  },
}
</script>

<template>
  <h3>Transport</h3>

  <transportation-card
    v-for="el in elements"
    @click="selectElement(el)"
    :selected="el === this.selected"
    :transportation="el.attributes"
    :key="el.id"
  ></transportation-card>

  <p @click="validateTransportation">Let's go</p>
</template>

<style></style>
