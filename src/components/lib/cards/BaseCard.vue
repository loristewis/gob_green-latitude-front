<template>
  <CardContainer class="base-card-container" :accent="true">
    <Title tag="h2" class="name">
      {{ title }}
    </Title>

    <p v-if="description">
      {{ description }}
    </p>

    <slot></slot>
  </CardContainer>
</template>

<script>
import { Title, CardContainer } from '@/components/lib'

export default {
  name: 'BaseCard',
  components: { Title, CardContainer },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="scss">
.base-card-container {
  padding: 32px;
  user-select: none;

  .name {
    margin-bottom: 8px;
  }
}
</style>
