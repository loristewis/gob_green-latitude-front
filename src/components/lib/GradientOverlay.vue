<template>
  <div class="gradient-overlay" v-if="isPhone" />
</template>

<script>
import { screenSize } from '@/mixins/index.js'

export default {
  name: 'GradientOverlay',
  mixins: [screenSize],
}
</script>

<style scoped>
.gradient-overlay {
  position: fixed;
  left: 0;
  right: 0;
  height: 96px;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, var(--color-beige-cool));
  pointer-events: none;
  z-index: 4;
}
</style>
