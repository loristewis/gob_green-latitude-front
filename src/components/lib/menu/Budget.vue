<template>
  <div class="budget-container">
    <div class="content"><slot /></div>

    <div class="star">
      <div>
        <StarIcon class="hero-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { StarIcon } from '@heroicons/vue/solid'

export default {
  name: 'Budget',
  components: {
    StarIcon,
  },
}
</script>

<style scoped lang="scss">
.budget-container {
  position: relative;

  .star {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-yellow);
    transform: rotate(9.2deg);

    > div {
      height: 32px;
      width: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid var(--color-white);
      border-radius: 50%;
    }
  }

  .content {
    position: absolute;
    top: 24px;
    left: 16px;
    height: 32px;
    width: max-content;
    padding: 8px 24px;
    border-radius: 16px;
    line-height: 16px;
    color: var(--color-white);
    font-weight: var(--font-bold);
    background-color: var(--color-yellow);
    transform: rotate(-6.73deg);
  }
}
</style>
