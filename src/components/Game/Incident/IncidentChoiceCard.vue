<template>
  <CardContainer
    class="incident-choice-card-container"
    :accent="false"
    @click="$emit('select')"
  >
    <p>{{ choice.title }}</p>

    <Button :chevron="false" :tight="true" class="validate-button">
      <ArrowNarrowRightIcon class="hero-icon" />
    </Button>
  </CardContainer>
</template>

<script>
import { CardContainer, Button } from '@/components/lib'
import { ArrowNarrowRightIcon } from '@heroicons/vue/solid'

export default {
  name: 'IncidentChoiceCard',
  components: { CardContainer, Button, ArrowNarrowRightIcon },
  props: {
    choice: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.incident-choice-card-container {
  padding: 24px 64px 24px 32px;

  &:not(:last-of-type) {
    margin-bottom: 16px;
  }

  .validate-button {
    position: absolute;
    right: -8px;
    bottom: -24px;

    line-height: 0;

    .hero-icon {
      height: 24px;
      width: 24px;
      color: var(--color-white);
    }
  }
}
</style>
