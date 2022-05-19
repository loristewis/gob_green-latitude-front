<template>
  <div id="menu-container">
    <div id="menu-gauges-container">
      <Gauge
        id="wellness-gauge"
        :value="score.wellness"
        from="left"
        :image="Smiley"
      />

      <Gauge
        id="pollution-gauge"
        :value="score.pollution"
        from="right"
        :image="CloudyEarth"
      />
    </div>

    <div class="home-button-container">
      <IconButton :icon="HomeIcon" background-color="#cebea8" size="40" />
    </div>

    <div class="menu-budget-container">
      <Budget :value="score.budget" id="menu-budget" />
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/lib/IconButton.vue'
import Budget from '@/components/lib/scores/Budget.vue'
import Gauge from '@/components/lib/scores/Gauge.vue'

import { HomeIcon } from '@heroicons/vue/solid'

import Smiley from '../../assets/smiley.svg'
import Fire from '../../assets/fire.svg'
import CloudyEarth from '../../assets/cloudy-earth.svg'

export default {
  name: 'Menu',
  components: {
    IconButton,
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
      CloudyEarth,
      HomeIcon,
    }
  },
}
</script>

<style lang="scss">
#menu-container {
  display: grid;
  grid-template-columns: 1fr 72px;
  grid-gap: 8px 16px;
  height: 110px;
  margin: 16px 12px;

  @include screen-xs {
    margin: 24px 20px;
  }

  #menu-gauges-container {
    display: flex;
    flex-direction: column;
    justify-content: end;
    grid-row-start: 1;
    grid-row-end: 3;

    #pollution-gauge {
      margin-left: auto;
      //top: -4px;
      //left: 32px;
    }
  }

  .home-button-container {
    display: flex;
    justify-content: end;
  }

  .menu-budget-container {
    //display: flex;
    //justify-content: end;
  }
}
</style>
