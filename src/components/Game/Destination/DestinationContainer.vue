<script>
import { useStore } from './../../../store/index'

import DestinationCard from './DestinationCard.vue'

export default {
  name: 'DestinationContainer',
  components: {
    DestinationCard,
  },
  props: ['elements'],
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    emitDestinationChoice() {
      if (this.store.trip.destination) {
        this.$emit('validate-destination')
      }
    },
  },
}
</script>

<template>
  <h3>Destination</h3>
  <select v-model="store.trip.destination">
    <option disabled value="">Destination</option>
    <option
      v-for="el in elements"
      :value="el.attributes"
      :key="el.attributes.title"
    >
      {{ el.attributes.title }}
    </option>
  </select>

  <p @click="emitDestinationChoice">Let's go</p>

  <p v-if="store.trip.destination">
    <span>{{ store.trip.destination.category }}</span>
  </p>

  <destination-card
    v-for="el in elements"
    :destination="el.attributes"
    :key="el.id"
  ></destination-card>
</template>

<style></style>
