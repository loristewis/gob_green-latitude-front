<template>
  <GameLayout class="transport-container">
    <template #default>
      <div class="transport-listing-container">
        <TransportationCard
          v-for="(el, i) in elements"
          @validate-transportation="validateTransportation"
          @click="selectElement($event, el)"
          :key="el.id"
          :transport="el.attributes"
          :sticker="this.displayTags.includes(i) ? this.tags[i] : null"
          tag-color="green"
        />
      </div>

      <GradientOverlay />
    </template>
  </GameLayout>
</template>

<script>
import { useStore } from '@/store'
import { shuffleArray, getRandomInt } from '@/helpers'
import { transportTags } from '@/constants'
import { GradientOverlay } from '@/components/lib'

import GameLayout from '@/components/GameLayout.vue'
import TransportationCard from './TransportationCard.vue'

export default {
  name: 'TransportationContainer',
  props: ['elements'],
  components: {
    GradientOverlay,
    GameLayout,
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
    selectElement(event, element) {
      if (event.target.closest('.transport-card-head')) {
        if (this.store.selected === element.attributes) {
          this.store.selected = null
          return
        } else {
          if (this.store.soundon) {
            this.store.audio.click.play()
          }
        }
      }
      this.store.selected = element.attributes
      this.store.thought = this.store.selected.thoughts
        ? this.store.selected.thoughts
        : this.store.thought
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

<style lang="scss">
.transport-container {
  main {
    overflow: scroll;
  }

  .transport-listing-container {
    padding-bottom: 96px;
  }
}
</style>
