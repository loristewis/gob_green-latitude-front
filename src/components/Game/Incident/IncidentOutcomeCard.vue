<template>
  <BaseCard
    :title="processedTitle"
    :description="processedDescription"
    class="incident-outcome-card-container"
  >
    <ScoreEvolutionGroup v-bind="$props" />

    <Button
      :isDisabled="this.buttonDisabled"
      class="incident-outcome-button"
      @click="acceptOutcome"
    >
      Continuer
    </Button>
  </BaseCard>
</template>

<script>
import { useStore } from '@/store'
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
  setup() {
    const store = useStore()
    const wording = store.wording

    return {
      wording,
    }
  },
  data() {
    return {
      Star,
      buttonDisabled: false,
      processedTitle: this.wording(this.title),
      processedDescription: this.wording(this.description),
    }
  },
  methods: {
    acceptOutcome() {
      this.buttonDisabled = true
      setTimeout(() => {
        this.$emit('next-step')
      }, 2)
    },
  },
}
</script>

<style lang="scss">
.incident-outcome-card-container {
  margin: 32px 0 0;
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
