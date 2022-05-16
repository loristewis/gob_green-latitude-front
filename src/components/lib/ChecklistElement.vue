<template>
  <div class="checklist-element">
    <p><CheckIcon class="checklist-element-icon" /><slot /></p>
  </div>
</template>

<script>
import { CheckIcon } from '@heroicons/vue/solid'

export default {
  name: 'ChecklistElement',
  components: {
    CheckIcon,
  },
}
</script>

<style lang="scss">
.checklist-element {
  &-icon {
    display: inline-block;
    height: 18px;
    width: 18px;
    border-radius: 16px;
    padding: 2px;
    top: 4px;
    margin-right: 8px;
    background-color: var(--color-green-peps);
    color: var(--color-teal);
  }
}
</style>
