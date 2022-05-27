<template>
  <div class="budget-container" :style="coinsHeight">
    <div class="content">{{ value }}</div>

    <div
      :style="coinsHeight"
      class="coins-container"
      :class="whiteBackground ? 'white-background' : ''"
      v-if="value > 0"
    >
      <div class="coin" v-for="index in value" :key="index">
        <img :src="Coin" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Coin from '@/assets/coin.svg'

export default {
  name: 'Budget',
  props: {
    value: {
      type: Number,
      required: true,
    },
    whiteBackground: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      Coin,
    }
  },
  computed: {
    coinsHeight() {
      return { height: this.value > 0 ? 28 + 4 * this.value + 'px' : 'auto' }
    },
  },
}
</script>

<style lang="scss">
.budget-container {
  display: flex;
  align-items: flex-end;

  .coins-container {
    position: absolute;
    left: 0;
    bottom: -12px;
    display: flex;
    flex-direction: column;
    width: 32px;
    transform: rotate(180deg);
    height: auto;
    padding-left: 1px;
    border-radius: 20px;
    background: var(--color-beige-cool);

    &.white-background {
      background: var(--color-white);
    }

    .coin {
      height: 26px;
      width: 26px;

      & + .coin {
        margin-top: -22px;
      }
    }
  }

  .content {
    position: relative;
    left: 12px;
    //top: 24px;
    bottom: 0;
    height: 32px;
    width: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 16px;
    color: var(--color-white);
    font-weight: var(--font-bold);
    background-color: var(--color-yellow);
    transform: rotate(-6.73deg);
  }
}
</style>
