<template>
  <div class="sticker-container">
    <span :style="{ color, backgroundColor }"><slot /></span>
  </div>
</template>

<script>
import { getRandomFromArray } from '@/helpers'
import { colorCombos } from '@/constants'

export default {
  name: 'Sticker',
  props: {
    theme: {
      type: String,
      required: false,
    },
  },
  data() {
    const combo = this.theme ? colorCombos.find(el => el.id === this.theme) : getRandomFromArray(colorCombos)

    return {
      color: `var(--color-${combo.text})`,
      backgroundColor: `var(--color-${combo.background})`,
    }
  },
}
</script>

<style lang="scss">
.sticker-container {
  padding: 4px 0;
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
