<template>
  <CardWithImageAndBudget class="activity-card-container" v-bind="$props" />

  <ScoreEvolutionGroup v-bind="$props" />
</template>

<script>
import { CardWithImageAndBudget, ScoreEvolutionGroup } from '@/components/lib'

export default {
  name: 'ActivityCard',
  components: { CardWithImageAndBudget, ScoreEvolutionGroup },
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
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
.activity-card-container {
  .infos {
    min-height: 144px;
  }
}
</style>
