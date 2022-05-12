<script>
import { useStore } from './../../../store/index'

import DestinationCard from './DestinationCard.vue'

export default {
  name: 'DestinationContainer',
  props: ['elements'],
  components: {
    DestinationCard,
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
    emitDestinationChoice() {
      if (!this.selected) {
        console.log('stp choisis une destination')
        return
      }

      this.store.trip.destination = this.selected.attributes
      this.$emit('validate-destination')
    },
  },
}
</script>

<template>
  <h3>Destination</h3>

  <destination-card
    v-for="el in elements"
    @click="selectElement(el)"
    :selected="el === this.selected"
    :destination="el.attributes"
    :key="el.id"
  ></destination-card>

  <p @click="emitDestinationChoice">Let's go</p>
</template>

<style></style>
