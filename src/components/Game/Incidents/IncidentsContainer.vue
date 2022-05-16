<script>
import { useStore } from './../../../store/index'
import { getRandomFromArray } from './../../../helpers'

export default {
  name: 'IncidentsContainer',
  props: ['elements'],
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  mounted() {
    console.log(this.store.trip.incidents)
    console.log(getRandomFromArray(this.store.trip.incidents))
  },
}
</script>

<template>
  <h3>Incidents</h3>
  <p @click="store.moveToNextStep">Skip</p>
</template>

<style></style>
