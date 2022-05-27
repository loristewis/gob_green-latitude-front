<template>
  <div id="menu-container">
    <ScoreContainer v-if="displayScore" :score="score" />
    <div class="home-button-container">
      <IconButton :icon="HomeIcon" background-color="#cebea8" size="40" />
    </div>
  </div>
</template>

<script>
import ScoreContainer from '@/components/lib/scores/ScoreContainer.vue'

import { HomeIcon } from '@heroicons/vue/solid'

export default {
  name: 'Menu',
  components: {
    ScoreContainer,
  },
  props: {
    score: {
      type: Object,
      default: () => {
        return {
          budget: 13,
          wellness: 6,
          pollution: 0,
        }
      },
      required: true,
    },
    displayScore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      HomeIcon,
    }
  },
}
</script>

<style lang="scss">
#menu-container {
  display: grid;
  grid-template-columns: 1fr 72px;
  grid-gap: 8px 16px;
  height: 110px;
  margin: 16px 12px;

  @include screen-xs {
    margin: 24px 20px;
  }

  .home-button-container {
    display: flex;
    justify-content: end;
  }
}
</style>
