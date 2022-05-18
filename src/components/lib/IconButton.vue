<template>
  <div class="icon-button-container" :style="style">
    <component :is="icon" class="hero-icon" />
  </div>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    size: {
      type: String,
      default: '48',
    },
    icon: {
      required: true,
    },
    backgroundColor: {
      type: String,
      default: 'var(--color-beige-dark)',
      required: false,
    },
    iconColor: {
      type: String,
      default: 'var(--color-white)',
      required: false,
    },
  },
  computed: {
    style() {
      return {
        backgroundColor: this.backgroundColor,
        height: `${this.size}px`,
        width: `${this.size}px`,
      }
    },
  },
}
</script>

<style lang="scss">
.icon-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: all 0.2s;
}
</style>
