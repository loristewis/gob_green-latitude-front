<template>
  <CardContainer>
    <slot></slot>
  </CardContainer>
</template>

<script>
import CardContainer from './sub-components/CardContainer.vue'

export default {
  name: 'BaseCard',
  components: { CardContainer },
}
</script>

<style lang="scss" scoped>
.card-container {
  padding: 12px 16px;
}
</style>
