<template>
  <div class="gauge-container" :class="`from-${from}`">
    <div class="gauge">
      <div class="progress" :style="progressStyle"></div>
    </div>

    <img :src="icon" alt="" />
  </div>
</template>

<script>
import { scores } from '@/constants'

import Smiley from '@/assets/smiley.svg'
import Fire from '@/assets/fire.svg'
import CloudyEarth from '@/assets/cloudy-earth.svg'

export default {
  name: 'Gauge',
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
    from: {
      type: String,
      required: true,
      validator(value) {
        return ['left', 'right'].includes(value)
      },
    },
  },
  data() {
    return {
      Smiley,
      Fire,
      CloudyEarth,
    }
  },
  computed: {
    icon() {
      if (this.name === 'pollution') return CloudyEarth
      if (this.name === 'wellness') return Smiley
    },
    progressStyle() {
      return {
        // width: `${(this.value + 50) / 100}%`,
        width: `${this.value * 10}%`,
        backgroundColor: this.color,
      }
    },
    color() {
      if (this.name === 'pollution') return 'var(--color-green-light)'
      if (this.name === 'wellness') return 'var(--color-green-light)'
    },
  },
}
</script>

<style lang="scss">
.gauge-container {
  display: flex;
  width: calc(100% - 32px);

  &:last-of-type {
    margin-bottom: 8px;
  }

  img {
    width: 40px;
    height: 40px;
  }

  .gauge {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    width: calc(100% - 24px);
    height: 24px;
    padding: 4px;
    background-color: var(--color-beige-light);
    border-radius: 12px;

    .progress {
      height: 16px;
      transition: width 0.6s;
    }
  }

  &.from-left {
    .gauge {
      left: 26px;
      padding-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .progress {
      border-radius: 0 8px 8px 0;
    }
  }

  &.from-right {
    justify-content: right;

    .gauge {
      right: 26px;
      padding-right: 0;
      justify-content: right;
      flex-direction: row-reverse;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .progress {
      border-radius: 8px 0 0 8px;
    }
  }
}
</style>
