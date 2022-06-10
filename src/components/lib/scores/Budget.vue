<template>
  <div
    class="budget-container"
    :style="{
      height:
        currentValue < 12 ? calculateHeight(12) : calculateHeight(currentValue),
    }"
  >
    <div class="content">{{ currentValue }}</div>

    <div
      :style="{ height: coinsHeight }"
      class="coins-container"
      :class="whiteBackground ? 'white-background' : ''"
    >
      <div class="coin empty" v-if="currentValue === 0">
        <img :src="EmptyCoin" alt="" />
      </div>
      <div v-else>
        <div class="coin" v-for="index in currentValue" :key="index">
          <img :src="Coin" alt="" />
        </div>
        <div
          v-if="animation"
          class="coin difference"
          v-for="index in difference"
          :key="index"
        >
          <img :src="Coin" alt="" />
          <img :src="WhiteCoin" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Coin from '@/assets/coins/coin.svg'
import EmptyCoin from '@/assets/coins/empty-coin.svg'
import WhiteCoin from '@/assets/coins/white-coin.svg'

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
      EmptyCoin,
      WhiteCoin,
      currentValue: Math.max(this.value, 0),
      oldValue: 0,
      difference: 0,
      coinsHeight: this.calculateHeight(this.value),
      animation: false,
    }
  },
  watch: {
    value: function (newVal, oldVal) {
      if (this.animateDifference) clearTimeout(this.animateDifference)

      this.oldValue = oldVal
      this.currentValue = Math.max(newVal, 0)
      this.difference = Math.abs(newVal - oldVal)

      this.animation = newVal < oldVal

      if (this.animation) {
        this.coinsHeight = this.calculateHeight(this.oldValue)
        this.animateDifference = setTimeout(() => {
          this.coinsHeight = this.calculateHeight(this.currentValue)
          this.animation = false
        }, 1000)
      } else {
        this.coinsHeight = this.calculateHeight(this.currentValue)
      }
    },
  },
  methods: {
    calculateHeight(value) {
      return value > 0 ? 28 + 4 * value + 'px' : 28 + 4 + 'px'
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

    > div:first-child {
      position: absolute;
    }

    &.white-background {
      background: var(--color-white);
    }

    .coin {
      height: 26px;
      width: 26px;
      position: relative;

      & + .coin {
        margin-top: -22px;
      }

      &.difference {
        > img {
          position: absolute;
        }

        img:nth-child(2) {
          animation: pulsating 0.4s infinite;
        }
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
