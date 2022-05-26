<template>
  <div
    class="activities-modal-container"
    :class="{ hidden: !open }"
    @click="$emit('validate-activity')"
  >
    <div class="backdrop" />

    <CardContainer v-if="outcome" class="activities-modal-card-container">
      <Title tag="h2" class="name">{{ outcome.title }}</Title>

      <p>{{ outcome.description }}</p>

      <ScoreEvolutionGroup
        v-bind="$props"
        :budget="outcome.budget"
        :pollution="outcome.pollution"
        :wellness="outcome.wellness"
      />
    </CardContainer>
  </div>
</template>

<script>
import { CardContainer, Title, ScoreEvolutionGroup } from '@/components/lib'

export default {
  name: 'ActivitiesModalContainer',
  components: { CardContainer, Title, ScoreEvolutionGroup },
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    outcome: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.activities-modal-container {
  display: flex;
  align-items: center;
  justify-content: center;

  &.hidden {
    display: none;
  }

  .backdrop {
    background-color: var(--color-beige-dark);
    position: absolute;
    inset: 0;
    opacity: 0.4;
  }

  position: absolute;
  inset: 0;
  z-index: 10;

  .activities-modal-card-container {
    min-width: 296px;
    padding: 24px 20px;
  }
}
</style>
