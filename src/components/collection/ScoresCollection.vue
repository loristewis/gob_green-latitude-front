<template>
  <Title>Menu complet</Title>
  <Menu />

  <Title>Jauges</Title>
  <div style="display: flex">
    <button @click="changeValue(-2)">-2</button>
    <button @click="changeValue(-1)">-1</button>
    <button @click="changeValue(1)">+1</button>
    <button @click="changeValue(2)">+2</button>
  </div>
  <Gauge name="wellness" :value="testValue" from="left" />
  <Gauge name="wellness" :value="3" from="left" />
  <Gauge name="wellness" :value="5" from="left" />
  <Gauge name="wellness" :value="8" from="left" />
  <Gauge name="wellness" :value="10" from="left" />

  <br />

  <Gauge name="pollution" :value="1" from="right" />
  <Gauge name="pollution" :value="3" from="right" />
  <Gauge name="pollution" :value="5" from="right" />
  <Gauge name="pollution" :value="8" from="right" />
  <Gauge name="pollution" :value="10" from="right" />

  <Title>Budget</Title>
  <div class="demo-budget-container">
    <Budget class="demo-budget" :value="10"></Budget>
    <Budget class="demo-budget" :value="6"></Budget>
    <Budget class="demo-budget" :value="2"></Budget>
  </div>

  <Title>ScoreEvolution</Title>
  <div class="demo-container">
    <Title tag="h2">ScoreEvolutionGroup</Title>

    <ScoreEvolutionGroup budget="10" pollution="10" wellness="10" />
    <br />
    <hr />
    <ScoreEvolutionGroup budget="-10" pollution="-10" wellness="-10" />
  </div>

  <div class="demo-container">
    <Title tag="h2">ScoreEvolutionItem</Title>

    <Title tag="h3">Budget</Title>
    <div>
      <ScoreEvolutionItem name="budget" :value="10" />
      <ScoreEvolutionItem name="budget" :value="-10" />
    </div>

    <Title tag="h3">Pollution</Title>
    <div>
      <ScoreEvolutionItem name="pollution" :value="10" />
      <ScoreEvolutionItem name="pollution" :value="-10" />
    </div>

    <Title tag="h3">Wellness</Title>
    <div>
      <ScoreEvolutionItem name="wellness" :value="10" />
      <ScoreEvolutionItem name="wellness" :value="-10" />
    </div>
  </div>
</template>

<script>
import { Title, Menu } from '@/components/lib'

import Gauge from '@/components/lib/scores/Gauge.vue'
import Budget from '@/components/lib/scores/Budget.vue'
import ScoreEvolutionGroup from '@/components/lib/scores/ScoreEvolutionGroup.vue'
import ScoreEvolutionItem from '@/components/lib/scores/ScoreEvolutionItem.vue'

import Smiley from '@/assets/smiley.svg'
import Fire from '@/assets/fire.svg'

export default {
  name: 'ScoresCollection',
  components: {
    ScoreEvolutionItem,
    ScoreEvolutionGroup,
    Title,
    Menu,
    Gauge,
    Budget,
  },
  data() {
    return {
      Smiley,
      Fire,
      testValue: 2,
    }
  },
  methods: {
    changeValue(number) {
      this.testValue += number
    },
  },
}
</script>

<style lang="scss">
.demo-container {
  background-color: var(--color-beige-cool);
  margin-top: 16px;
  padding: 40px;

  > h3 {
    margin: 24px 0 16px;
  }
}
</style>
