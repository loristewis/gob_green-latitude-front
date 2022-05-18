<template>
  <CardContainer class="incident-card-container">
    <Title tag="h2" class="name">
      {{ title }}
    </Title>

    <p>
      {{ description }}
    </p>
  </CardContainer>
</template>

<script>
import { Title, CardContainer, BaseCard } from '@/components/lib'

export default {
  name: 'IncidentCard',
  components: { BaseCard, Title, CardContainer },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.incident-card-container {
  padding: 32px;
  margin-bottom: 32px;

  .name {
    margin-bottom: 8px;
  }
}
</style>
