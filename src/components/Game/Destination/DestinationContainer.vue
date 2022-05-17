<script>
import { useStore } from './../../../store/index'

import { Button } from './../../lib'
import DestinationSwiper from './DestinationSwiper.vue'

export default {
  name: 'DestinationContainer',
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  components: {
    Button,
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
  <DestinationSwiper :destinations="elements"></DestinationSwiper>
  <Button main @click="emitDestinationChoice">Allons-y !</Button>
</template>

<style></style>
