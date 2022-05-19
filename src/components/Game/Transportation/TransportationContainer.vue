<template>
  <TransportationCard
    v-for="(el, i) in elements"
    @validate-transportation="validateTransportation"
    @click="selectElement(el)"
    :key="el.id"
    :transport="el.attributes"
    :sticker="this.displayTags.includes(i) ? this.tags[i] : null"
    tag-color="green"
  />
</template>

<script>
import { useStore } from '@/store/index'
import { shuffleArray, getRandomInt } from '@/helpers'
import { transportTags } from '@/constants'

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
      tags: shuffleArray(transportTags),
      displayTags: [],
    }
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  mounted() {
    // on choisit le nombre de tags à afficher (1 ou 2)
    const tagsNumber = Math.random() > 0.5 ? 1 : 2
    // on place ces tags au hasard parmi les 4 transports affichés
    for (let i = 0; i < tagsNumber; i++) {
      this.displayTags.push(getRandomInt(4))
    }
  },
  methods: {
    selectElement(element) {
      this.store.selected = element.attributes
    },
    validateTransportation() {
      this.store.trip.transportation = this.store.selected
      this.store.selected = null

      console.log(this.store.trip.transportation)
      this.store.collectPotentialIncidents(this.store.trip.transportation)
      this.store.finishStep()
    },
  },
}
</script>
