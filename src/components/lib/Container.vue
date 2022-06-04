<template>
  <div class="generic-container" :style="style">
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Container',
}
</script>

<style lang="scss">
.generic-container {
  display: flex;
  margin: auto;
  height: 100%;
  width: 100vw;
  background-color: var(--color-background);
  overflow-x: hidden;
  overflow-y: scroll;

  > div {
    width: 100%;
  }
}
</style>
