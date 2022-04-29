<script>
import { useStore } from './../../../store/index'

export default {
  name: 'IncidentsContainer',
  props: ['elements'],
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
}
</script>

<template>
  <h3>Incidents</h3>
  <p @click="store.moveToNextStep">Skip</p>
</template>

<style></style>
