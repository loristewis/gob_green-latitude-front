<template>
  <div class="gradient-overlay" />
</template>

<script>
export default {
  name: 'GradientOverlay',
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
