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
        :image="Fire"
      />
    </div>

    <Budget :value="score.budget" id="menu-budget" />
    <div class="home-button-container">
      <IconButton :icon="HomeIcon" background-color="#cebea8" size="40" />
    </div>
  </div>
</template>

<script>
import { IconButton } from '@/components/lib'
import { HomeIcon } from '@heroicons/vue/solid'

import Budget from './Budget.vue'
import Gauge from './Gauge.vue'
import Smiley from '../../../assets/smiley.svg'
import Fire from '../../../assets/fire.svg'

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
      HomeIcon,
    }
  },
}
</script>

<style lang="scss">
#menu-container {
  margin: 24px 20px;
  height: 110px;

  #menu-home-button {
    position: absolute;
    right: 0;
    top: 0;
  }

  #menu-budget {
    position: absolute;
    right: 16px;
    bottom: 12px;
  }

  #menu-gauges-container {
    top: 26px;

    #pollution-gauge {
      top: -4px;
      left: 32px;
    }
  }

  .home-button-container {
    display: flex;
    justify-content: end;
  }
}
</style>
