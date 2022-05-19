<template>
  <Title>Menu complet</Title>
  <Menu />

  <Title>Jauges</Title>
  <Gauge :value="10" from="left" :image="Smiley" />
  <Gauge :value="4" from="right" :image="Fire" />

  <Title>Budget</Title>
  <div class="demo-budget-container">
    <Budget class="demo-budget" :value="10"></Budget>
    <Budget class="demo-budget" :value="6"></Budget>
    <Budget class="demo-budget" :value="2"></Budget>
  </div>

  <Title>ScoreEvolution</Title>
  <div class="demo-budget-container">
    <div>
      <Title tag="h2">Budget</Title>
      <ScoreEvolution name="budget" :value="10" />
      <ScoreEvolution name="budget" :value="-10" />
    </div>

    <div>
      <Title tag="h2">Pollution</Title>
      <ScoreEvolution name="pollution" :value="10" />
      <ScoreEvolution name="pollution" :value="-10" />
    </div>

    <div>
      <Title tag="h2">Wellness</Title>
      <ScoreEvolution name="wellness" :value="10" />
      <ScoreEvolution name="wellness" :value="-10" />
    </div>
  </div>
</template>

<script>
import { Title, Menu } from '@/components/lib'

import Gauge from '@/components/lib/scores/Gauge.vue'
import Budget from '@/components/lib/scores/Budget.vue'
import ScoreEvolution from '@/components/lib/scores/ScoreEvolution.vue'

import Smiley from '../../assets/smiley.svg'
import Fire from '../../assets/fire.svg'

export default {
  name: 'ScoresCollection',
  components: { ScoreEvolution, Title, Menu, Gauge, Budget },
  data() {
    return {
      Smiley,
      Fire,
    }
  },
}
</script>

<style lang="scss" scoped>
.demo-budget-container {
  background-color: var(--color-beige-cool);
  padding: 40px;
  display: flex;
  gap: 30px;
}
</style>
