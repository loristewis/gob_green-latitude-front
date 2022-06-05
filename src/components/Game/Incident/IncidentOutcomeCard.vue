<template>
  <BaseCard
    :title="title"
    :description="description"
    class="incident-outcome-card-container"
  >
    <ScoreEvolutionGroup v-bind="$props" />

    <img :src="Star" alt="" class="star" />

    <Button class="incident-outcome-button" @click="$emit('next-step')">
      Continuer
    </Button>
  </BaseCard>
</template>

<script>
import { BaseCard, Button, ScoreEvolutionGroup } from '@/components/lib'

import Star from '@/assets/star.svg'

export default {
  name: 'IncidentOutcomeCard',
  components: { Button, BaseCard, ScoreEvolutionGroup },
  props: {
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
  data() {
    return {
      Star,
    }
  },
}
</script>

<style lang="scss">
.incident-outcome-card-container {
  margin-top: 128px;
  margin-bottom: 32px;
  padding-bottom: 112px;

  .scores {
    display: flex;
    justify-content: space-around;
    margin-top: 24px;
  }

  .star {
    position: absolute;
    top: -88px;
    right: -24px;
  }

  .incident-outcome-button {
    position: absolute;
    bottom: 8px;
    right: -16px;
  }
}
</style>
