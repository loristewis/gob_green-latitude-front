<template>
  <div class="activities-counter-container">
    <Tag color="green">Choisis encore 3 activités !</Tag>

    <div class="counter-listing">
      <div class="counter" :style="counterStyle">
        <CheckIcon class="hero-icon" />
      </div>
      <div class="counter" :style="counterStyle">2</div>
      <div class="counter" :style="counterStyle">3</div>
    </div>
  </div>
</template>

<script>
import { Tag } from '@/components/lib'
import { CheckIcon } from '@heroicons/vue/solid'

export default {
  name: 'ActivitiesCounter',
  components: { Tag, CheckIcon },
  computed: {
    counterStyle() {
      return {
        // backgroundColor: 'var(--color-green-light)',
        backgroundColor: 'var(--color-beige-dark)',
      }
    },
  },
}
</script>

<style lang="scss">
.activities-counter-container {
  .counter-listing {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin: 8px 0;
  }

  .counter {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    font-weight: 600;

    .hero-icon {
      color: var(--color-white);
      height: 20px;
      width: 20px;
    }
  }
}
</style>
