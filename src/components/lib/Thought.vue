<template>
  <div class="thought-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Thought',
}
</script>

<style lang="scss">
.thought-container {
  width: max-content;
  padding: 12px 16px;
  background-color: var(--color-white);
  box-shadow: 0 3px 0 #f1e4d1;
  border-radius: 25px;
}
</style>
