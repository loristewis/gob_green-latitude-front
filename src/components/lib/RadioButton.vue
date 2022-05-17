<template>
  <div class="radio-button-container">
    <div class="radio-container">
      <div class="radio" :class="{ selected: selected }" />
    </div>

    <div class="content">
      <slot />
    </div>
  </div>
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
.radio-button-container {
  display: flex;
  align-items: center;
  column-gap: 4px;

  .radio-container,
  .content {
    height: 24px;
  }

  .content {
    display: flex;
  }

.option-radio {
    height: 16px;
    width: 16px;
    padding: 2px;
    border-radius: 100%;
    border: 2px solid var(--color-blue-gray);
    background-clip: content-box;

    &.selected {
      background-color: var(--color-blue-gray);
    }
  }

  .radio {
    height: 16px;
    width: 16px;
    padding: 2px;
    border-radius: 100%;
    border: 2px solid var(--color-blue-gray);

    &.selected {
      background-clip: content-box;
      background-color: var(--color-blue-gray);
    }
  }
}
</style>
