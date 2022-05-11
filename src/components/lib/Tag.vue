<template>
  <div class="tag-container" :class="color">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    color: {
      type: String,
      required: true,
      validator(value) {
        return ['red', 'green', 'purple', 'blue'].includes(value)
      },
    },
  },
}
</script>

<style lang="scss">
.tag-container {
  width: max-content;
  margin: 8px 0;
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: var(--font-semibold);
  font-size: 12px;

  &.red {
    color: var(--color-rose);
    background-color: var(--color-rose-cool);
  }

  &.green {
    color: var(--color-teal);
    background-color: var(--color-green-peps);
  }

  &.purple {
    color: var(--color-indigo);
    background-color: var(--color-purple-cool);
  }

  &.blue {
    color: var(--color-indigo);
    background-color: var(--color-blue-cool);
  }
}
</style>
