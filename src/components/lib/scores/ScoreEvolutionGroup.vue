<template>
  <div class="score-evolution-group-container">
    <ScoreEvolutionItem v-if="budget !== 0" name="budget" :value="budget" />

    <ScoreEvolutionItem
      v-if="pollution !== 0"
      name="pollution"
      :value="pollution"
    />

    <ScoreEvolutionItem
      v-if="wellness !== 0"
      name="wellness"
      :value="wellness"
    />
  </div>
</template>

<script>
import ScoreEvolutionItem from '@/components/lib/scores/ScoreEvolutionItem.vue'

export default {
  name: 'ScoreEvolutionGroup',
  components: { ScoreEvolutionItem },
  props: {
    budget: {
      type: Number,
      required: true,
    },
    pollution: {
      type: Number,
      required: true,
    },
    wellness: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.score-evolution-group-container {
  display: flex;
  justify-content: space-around;
  margin-top: 24px;
}
</style>
