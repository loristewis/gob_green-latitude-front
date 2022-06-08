<template>
  <CardContainer
    class="thought-container"
    :class="store.activeThought ? '' : 'hidden'"
  >
    <div class="thought">
      <transition name="fade" mode="out-in">
        <span :key="store.thought">
          {{ store.thought }}
        </span>
      </transition>
    </div>
  </CardContainer>
</template>

<script>
import CardContainer from '@/components/lib/cards/CardContainer.vue'
import { useStore } from '@/store'

export default {
  name: 'Thought',
  components: {
    CardContainer,
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
}
</script>

<style lang="scss">
.thought-container {
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  width: 100%;
  pointer-events: none;
  transition: 0.2s ease-in-out;

  .thought {
    top: 20px;
    width: max-content;
    max-width: 90%;
    margin: 0 auto;
    padding: 12px 16px;
    opacity: 0.9;
    top: 0;
    transition: opacity 0.4s ease-in-out, filter 0.3s ease-in-out,
      top 0.8s ease-in-out;

    &.hidden {
      opacity: 0;
      pointer-events: none;
      top: -20px;
      filter: blur(5px);
    }
  }
}
</style>
