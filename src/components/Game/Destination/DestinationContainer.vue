<script>
import { useStore } from './../../../store/index'

import DestinationSwiper from './DestinationSwiper.vue'

export default {
  name: 'DestinationContainer',
  props: ['elements'],
  components: {
    DestinationSwiper,
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
    emitDestinationChoice() {
      if (!this.store.selected) {
        console.log('stp choisis une destination')
        return
      }

      this.store.trip.destination = this.store.selected
      this.store.selected = null
      this.$emit('validate-destination')
    },
  },
}
</script>

<template>
  <h3>Destination</h3>

  <DestinationSwiper :destinations="elements"></DestinationSwiper>

  <p @click="emitDestinationChoice">Let's go</p>
</template>

<style></style>
