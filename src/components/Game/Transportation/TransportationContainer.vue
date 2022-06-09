<template>
  <GameLayout class="transport-container">
    <template #default>
      <div class="transport-listing-container">
        <TransportationCard
          v-for="(el, i) in elements"
          @validate-transportation="validateTransportation"
          @click="selectElement(el)"
          :key="el.id"
          :transport="el.attributes"
          :sticker="this.displayTags.includes(i) ? this.tags[i] : null"
          tag-color="green"
        />
      </div>

      <div class="gradient-overlay bottom" v-if="isPhone" />
    </template>
  </GameLayout>
</template>

<script>
import { screenSize } from '@/mixins'
import { useStore } from '@/store'
import { shuffleArray, getRandomInt } from '@/helpers'
import { transportTags } from '@/constants'

import GameLayout from '@/components/GameLayout.vue'
import TransportationCard from './TransportationCard.vue'

export default {
  name: 'TransportationContainer',
  props: ['elements'],
  mixins: [screenSize],
  components: {
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
    selectElement(element) {
      if (this.store.selected === element.attributes) {
        this.store.selected = null
        return
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

    .gradient-overlay {
      position: fixed;
      left: 0;
      right: 0;
      height: 96px;

      &.bottom {
        bottom: 0;
        background: linear-gradient(
          to bottom,
          transparent,
          var(--color-beige-cool)
        );
      }
    }
  }

  .transport-listing-container {
    padding-bottom: 96px;
  }
}
</style>
