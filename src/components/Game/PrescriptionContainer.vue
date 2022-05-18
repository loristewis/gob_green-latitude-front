<template>
  <div>Envie de mer et de {{ store.trip.wish }}</div>
  <p @click="store.moveToNextStep">Compris !</p>
</template>

<script>
import { useStore } from './../../store/index'

export default {
  name: 'PrescriptionContainer',
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
}
</script>
