<script>
import { useStore } from './../../../store/index'

import TransportationCard from './TransportationCard.vue'

export default {
  name: 'TransportationContainer',
  props: ['elements'],
  components: {
    TransportationCard,
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    validateTransportation() {
      if (this.store.trip.transportation) {
        this.store.calculateScore()
        this.store.moveToNextStep()
      } else {
        console.log('stp choisis un transport')
      }
    },
  },
}
</script>

<template>
  <h3>Transport</h3>
  <select v-model="store.trip.transportation">
    <option disabled value="">Transport</option>
    <option
      v-for="el in elements"
      :value="el.attributes"
      :key="el.attributes.title"
    >
      {{ store.wording(el.attributes.title) }}
    </option>
  </select>
  <p @click="validateTransportation">Let's go</p>
  <div v-if="store.trip.transportation">
    <p>
      Bien-être :
      {{
        store.trip.transportation.wellness > 0
          ? '+' + store.trip.transportation.wellness
          : store.trip.transportation.wellness
      }}
    </p>
    <p>Budget : -{{ store.trip.transportation.budget }}</p>
    <p>Pollution : +{{ store.trip.transportation.pollution }}</p>
  </div>

  <hr />

  <transportation-card
    v-for="el in elements"
    :transportation="el.attributes"
    :key="el.id"
  ></transportation-card>
</template>

<style></style>
