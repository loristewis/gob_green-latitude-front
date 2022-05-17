<template>
  <div class="text-sticker">
    <span :style="{ color, backgroundColor }"
      ><slot
    /></span>
  </div>
</template>

<script>
import { getRandomFromArray } from '../../helpers'
import { colorCombos } from './../../constants/colorCombos'

export default {
  name: 'Sticker',
  data() {
    const combo = getRandomFromArray(colorCombos)

    return {
      color: `var(--color-${combo.text})`,
      backgroundColor: `var(--color-${combo.background})`,
    }
  },
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
  }
}
</style>
