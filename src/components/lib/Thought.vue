<template>
  <CardContainer class="thought-container">
    <slot />
  </CardContainer>
</template>

<script>
import CardContainer from '@/components/lib/cards/CardContainer.vue'

export default {
  name: 'Thought',
  components: {
    CardContainer,
  },
}
</script>

<style lang="scss">
.thought-container {
  position: absolute;
  top: 20px;
  left: 50%;
  width: max-content;
  max-width: 90%;
  margin: 0 auto;
  padding: 12px 16px;
  transform: translateX(-50%);
  opacity: 0.9;
}
</style>
