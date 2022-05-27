<template>
  <div id="score-container" :class="small ? 'small' : ''">
    <div id="score-gauges-container">
      <Gauge
        id="wellness-gauge"
        name="wellness"
        :value="score.wellness"
        from="left"
        :small="small"
      />
      <Gauge
        id="pollution-gauge"
        name="pollution"
        :value="score.pollution"
        :from="small ? 'left' : 'right'"
        :small="small"
      />
    </div>

    <div id="score-budget-container">
      <Budget
        :whiteBackground="small"
        :value="score.budget"
        id="score-budget"
      />
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/lib/IconButton.vue'
import Budget from '@/components/lib/scores/Budget.vue'
import Gauge from '@/components/lib/scores/Gauge.vue'

export default {
  name: 'ScoreContainer',
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
    small: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
#score-container {
  display: contents;

  #score-gauges-container {
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

  #score-budget-container {
    top: -12px;
  }

  &.small {
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    #score-budget-container {
      transform: scale(0.75);
    }

    #score-gauges-container {
      display: contents;

      > div {
        grid-column: span 2;
      }
    }
  }
}
</style>
