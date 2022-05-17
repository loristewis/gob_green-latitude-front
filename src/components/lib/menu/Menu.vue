<template>
  <div id="menu-container">
    <HomeButton id="menu-home-button" />

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
  </div>
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
}
</style>
