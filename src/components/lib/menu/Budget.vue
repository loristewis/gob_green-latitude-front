<template>
  <div class="budget-container">
    <div class="content">{{ value }}</div>

    <div
      :style="{ height: (value > 0 ? 28 + 4 * value : 0) + 'px' }"
      class="coins-container"
    >
      <div class="coin" v-for="index in loopValue" :key="index">
        <img :src="Coin" />
      </div>
    </div>
  </div>
</template>

<script>
import Coin from './../../../assets/coin.svg'

export default {
  name: 'Budget',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loopValue: Math.max(this.value, 0),
      Coin,
    }
  },
}
</script>

<style lang="scss">
.budget-container {
  position: relative;

  .coins-container {
    position: absolute;
    left: -12px;
    bottom: -14px;
    display: flex;
    flex-direction: column;
    width: 32px;
    transform: rotate(180deg);
    height: auto;
    padding-left: 1px;
    background: var(--color-beige-cool);
    border-radius: 20px;

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
