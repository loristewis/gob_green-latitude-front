<template>
  <component
    :is="tag"
    :class="['title-container', darkMode ? 'dark-mode' : 'light-mode']"
    :style="style"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script>
import { titleTags } from '@/constants'

export default {
  name: 'Title',
  props: {
    tag: {
      type: String,
      default: 'h1',
      validator: (tag) => titleTags.includes(tag),
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
  },
  data() {
    return {
      style: { ...(this.color !== null && { color: this.color }) },
    }
  },
}
</script>

<style lang="scss" scoped>
.title-container {
  line-height: 1.2;
  font-family: var(--font-title);
}

h1.title-container {
  font-size: 28px;
  font-weight: 600;
}

h2.title-container {
  font-size: 22px;
}

h3.title-container {
  font-family: var(--font-text);
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 4px;
}
</style>
