<template>
  <div class="score-evolution-container">
    <div class="icon">
      <img :src="icon" alt="" />
    </div>

    <div class="arrow" :class="color">
      <ArrowNarrowDownIcon v-if="value < 0" class="hero-icon" />

      <ArrowNarrowUpIcon v-else class="hero-icon" />
    </div>
  </div>
</template>

<script>
import { scores } from '@/constants'

import Smiley from '@/assets/smiley.svg'
import Fire from '@/assets/fire.svg'
import CloudyEarth from '@/assets/cloudy-earth.svg'
import Coin from '@/assets/coin.svg'

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
      Smiley,
      Fire,
      CloudyEarth,
      Coin,
    }
  },
  computed: {
    icon() {
      if (this.name === 'budget') return Coin
      if (this.name === 'pollution') return Fire
      if (this.name === 'wellness') return Smiley
    },
    color() {
      if (this.name === 'budget' || this.name === 'wellness')
        return this.value < 0 ? 'bad' : 'good'

      if (this.name === 'pollution') return this.value < 0 ? 'good' : 'bad'
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
  }

  .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    transform: rotate(10deg);

    .hero-icon {
      height: 20px;
      width: 20px;
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
