<template>
  <div class="radio-button" :class="selected ? 'selected' : ''"></div>
</template>

<script>
export default {
  name: 'RadioButton',
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.radio-button {
  height: 18px;
  width: 18px;
  border-radius: 18px;
  border: 2px solid var(--color-blue-gray);

  &.selected {
    &::before {
      content: '';
      display: block;
      height: 10px;
      width: 10px;
      border-radius: 10px;
      background-color: var(--color-blue-gray);
      top: 2px;
      left: 2px;
    }
  }
}
</style>
