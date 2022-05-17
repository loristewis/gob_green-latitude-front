<template>
  <div class="text-sticker">
    <span><slot /></span>
  </div>
</template>

<script>
export default {
  name: 'Sticker',
}
</script>

<style lang="scss">
.text-sticker {
  transform: rotate(-3deg);
  text-transform: uppercase;
  font-family: var(--font-tag);

  > span {
    padding: 8px 12px;
    border-radius: 12px;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    color: var(--color-red);
    background-color: var(--color-rose-cool);
  }
}
</style>
