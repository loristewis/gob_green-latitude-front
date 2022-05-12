<template>
  <div :class="['card-container', accent && 'accent']">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardContainer',
  props: {
    accent: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss">
.card-container {
  background-color: var(--color-white);
  border-radius: 24px;

  &.accent {
    box-shadow: 0 3px 0 #f1e4d1;
  }
}
</style>
