<template>
  <div class="button-container" :class="{ disabled: isDisabled }">
    <div>
      <p><slot /></p>

      <ChevronRightIcon class="hero-icon" />
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon } from '@heroicons/vue/solid'

export default {
  name: 'Button',
  components: {
    ChevronRightIcon,
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
.button-container {
  height: 64px;
  width: max-content;
  margin: 16px auto;
  padding: 8px;
  border-radius: 32px;
  color: var(--color-white);
  font-family: var(--font-title);
  font-weight: var(--font-bold);
  font-size: 20px;
  background-color: var(--color-rose);
  transform: rotate(-6.63deg);

  &.disabled {
    opacity: 0.4;
  }

  > div {
    height: 48px;
    padding-left: 16px;
    padding-right: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 24px;
    border: 2px solid var(--color-white);

    p {
      margin: auto 8px;
    }
  }
}
</style>
