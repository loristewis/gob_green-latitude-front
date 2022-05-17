<template>
  <div class="thought-container">
    <BaseCard>
      <slot />
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from './cards/BaseCard.vue'

export default {
  name: 'Thought',
  components: {
    BaseCard,
  },
}
</script>

<style lang="scss">
.thought-container {
  width: max-content;
  max-width: 90%;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.9;
}
</style>
