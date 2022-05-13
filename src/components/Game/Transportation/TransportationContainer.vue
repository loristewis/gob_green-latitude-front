<script>
import { useStore } from './../../../store/index'

import { shuffleArray, getRandomInt } from './../../../helpers'
import { transportTags } from './../../../constants/transportTags.js'

import Button from './../../lib/Button.vue'
import TransportationCard from './TransportationCard.vue'

export default {
  name: 'TransportationContainer',
  props: ['elements'],
  components: {
    Button,
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
      console.log('select!')
      console.log(element)
      this.selected = element
    },
    validateTransportation() {
      if (!this.selected) {
        console.log('stp choisis un transport')
        return
      }

      this.store.trip.transportation = this.selected.attributes
      console.log(this.store.trip.transportation)
      this.store.calculateScore()
      this.store.moveToNextStep()
    },
  },
}
</script>

<template>
  <h3>Transport</h3>

  <transportation-card
    v-for="(el, i) in elements"
    @click="selectElement(el)"
    :tag="this.displayTags.includes(i) ? this.tags[i] : null"
    :selected="el === this.selected"
    :transportation="el.attributes"
    :key="el.id"
  ></transportation-card>

  <Button @click="validateTransportation">Let's go</Button>
</template>

<style></style>
