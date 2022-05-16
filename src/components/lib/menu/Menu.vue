<template>
  <Gauge :value="score.wellness" from="left" :image="Smiley" />

  <Gauge :value="score.pollution" from="right" :image="Fire" />

  <HomeButton />

  <Budget>{{ score.budget }}</Budget>
</template>

<script>
import HomeButton from './HomeButton.vue'
import Budget from './Budget.vue'
import Gauge from './Gauge.vue'
import Smiley from '../../../assets/smiley.svg'
import Fire from '../../../assets/fire.svg'

export default {
  name: 'Menu',
  components: {
    HomeButton,
    Budget,
    Gauge,
  },
  props: {
    score: {
      type: Object,
      default: () => {
        return {
          budget: 13,
          wellness: 6,
          pollution: 0,
        }
      },
      required: true,
    },
  },
  data() {
    return {
      Smiley,
      Fire,
    }
  },
}
</script>
