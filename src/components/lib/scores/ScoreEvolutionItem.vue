<template>
  <div class="score-evolution-container">
    <div class="icon" :class="name">
      <img :src="icon" alt="" />
    </div>

    <div class="arrow" :class="color">
      <ArrowNarrowDownIcon v-if="value < 0" class="hero-icon down" />
      <ArrowNarrowUpIcon v-else class="hero-icon up" />
    </div>
  </div>
</template>

<script>
import { scores, gauges } from '@/constants'

import Coin from '@/assets/coins/coin.svg'

import { ArrowNarrowDownIcon } from '@heroicons/vue/solid'
import { ArrowNarrowUpIcon } from '@heroicons/vue/solid'

export default {
  name: 'ScoreEvolutionItem',
  components: {
    ArrowNarrowDownIcon,
    ArrowNarrowUpIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
      validator: (name) => scores.includes(name),
    },
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      Coin,
    }
  },
  computed: {
    icon() {
      if (this.name === 'budget') {
        return Coin
      } else {
        return this.value < 0
          ? gauges[this.name][0].icon
          : gauges[this.name][2].icon
      }
    },
    color() {
      if (this.name === 'budget' || this.name === 'wellness') {
        return this.value < 0 ? 'bad' : 'good'
      } else {
        return this.value < 0 ? 'good' : 'bad'
      }
    },
  },
}
</script>

<style lang="scss">
.score-evolution-container {
  display: flex;
  align-items: center;

  .icon {
    height: 32px;
    width: 32px;

    img {
      height: 100%;
      width: 32px;
    }

    &.wellness,
    &.pollution {
      transform: scale(1.4);
    }
  }

  .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 24px;
    border-radius: 50%;

    .hero-icon {
      height: 20px;
      width: 20px;
    }

    &.up {
      transform: rotate(10deg);
    }

    &.down {
      transform: rotate(-10deg);
    }

    &.good {
      background-color: var(--color-green-peps);

      .hero-icon {
        color: var(--color-teal);
      }
    }

    &.bad {
      background-color: var(--color-rose-cool);

      .hero-icon {
        color: var(--color-rose);
      }
    }
  }
}
</style>
