<template>
  <div
    class="activities-modal-container"
    :class="{ hidden: !open }"
    @click="validateActivity"
  >
    <div class="backdrop" />

    <CardContainer class="activities-modal-card-container">
      <Title tag="h2" class="name"> Titre </Title>

      <p>Description</p>

      <ScoreEvolutionGroup
        v-bind="$props"
        :budget="1"
        :pollution="1"
        :wellness="1"
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
  },
  data() {
    return {
      isOpen: this.open,
    }
  },
  methods: {
    validateActivity() {
      this.isOpen = false
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
