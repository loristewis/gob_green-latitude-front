<template>
  <h3>Hébergement</h3>

  <AccommodationCard
    v-for="el in elements"
    :key="el.id"
    @click="selectElement(el)"
    :selected="el === this.selected"
    :title="el.attributes.title"
    :description="el.attributes.description"
    :thoughts="el.attributes.thoughts"
    :budget="el.attributes.budget"
    :image="getImage(el)"
  />

  <Button @click="validateAccommodation">Let's go</Button>
</template>

<script>
import { useStore } from './../../../store/index'

import Button from './../../lib/Button.vue'
import AccommodationCard from './AccommodationCard.vue'

import { getImage } from '../../../helpers'

export default {
  name: 'AccommodationContainer',
  props: ['elements'],
  components: {
    Button,
    AccommodationCard,
  },
  data() {
    return {
      selected: null,
      getImage,
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
    validateAccommodation() {
      if (!this.selected) {
        console.log('stp choisis un hébergement')
        return
      }

      this.store.trip.accommodation = this.selected.attributes
      this.selected = null

      console.log(this.store.trip.accommodation)
      this.store.collectPotentialIncidents(this.store.trip.accommodation)
      this.store.finishStep()
    },
  },
}
</script>
