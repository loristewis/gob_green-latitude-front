<script>
import { useStore } from './../../../store/index'

export default {
  name: 'AccommodationContainer',
  props: ['elements'],
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    validateAccommodation() {
      if (this.store.trip.accommodation) {
        this.store.calculateScore()
        this.store.moveToNextStep()
      } else {
        console.log('stp choisis un hébergement')
      }
    },
  },
}
</script>

<template>
  <h3>Hébergement</h3>
  <select v-model="store.trip.accommodation">
    <option disabled value="">Hébergement</option>
    <option
      v-for="el in elements"
      :value="el.attributes"
      :key="el.attributes.title"
    >
      {{ store.wording(el.attributes.title) }}
    </option>
  </select>
  <p @click="validateAccommodation">Let's go</p>
  <div v-if="store.trip.accommodation">
    <p>
      Bien-être :
      {{
        store.trip.accommodation.wellness > 0
          ? '+' + store.trip.accommodation.wellness
          : store.trip.accommodation.wellness
      }}
    </p>
    <p>Budget : -{{ store.trip.accommodation.budget }}</p>
    <p>Pollution : +{{ store.trip.accommodation.pollution }}</p>
  </div>
</template>

<style></style>
