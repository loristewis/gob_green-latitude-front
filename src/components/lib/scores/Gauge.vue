<template>
  <div class="gauge-container" :class="classList">
    <div class="gauge">
      <div ref="behind" class="progress" :style="progressStyle"></div>
      <div ref="front" class="progress" :style="progressStyle"></div>
    </div>

    <img :src="icon" alt="" />
  </div>
</template>

<script>
import { scores, gauges } from '@/constants'

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
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    let classList = ''
    classList += `from-${this.from}`
    classList += this.small ? ' small' : ''

    return {
      Smiley,
      Fire,
      CloudyEarth,
      classList,
    }
  },
  watch: {
    value: function (newVal, oldVal) {
      this.$refs.behind.classList.remove('progress-delayed')
      this.$refs.front.classList.remove('progress-delayed')

      if (newVal > oldVal) {
        this.$refs.front.classList.add('progress-delayed')
      } else {
        this.$refs.behind.classList.add('progress-delayed')
      }
    },
  },
  computed: {
    icon() {
      if (this.value < 4) {
        return gauges[this.name][0].icon
      } else if (this.value < 7) {
        return gauges[this.name][1].icon
      } else {
        return gauges[this.name][2].icon
      }
    },
    progressStyle() {
      return {
        // width: `${(this.value + 50) / 100}%`,
        width: `${this.value * 10}%`,
        backgroundColor: this.color,
      }
    },
    color() {
      console.log(gauges[this.name][0])
      if (this.value < 4) {
        return gauges[this.name][0].color
      } else if (this.value < 7) {
        return gauges[this.name][1].color
      } else {
        return gauges[this.name][2].color
      }
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
    width: 60px;
    height: 50px;
    transform: scale(0.95);
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
      max-width: 98%;
      height: 16px;
      position: absolute;
      transition: width 0.2s ease-in-out, background-color 0.6s ease-in-out;

      &:nth-child(1) {
        background-color: white !important;
        animation: pulsating 0.8s infinite;
      }

      &-delayed {
        transition: width 1.2s ease-in-out, background-color 0.6s ease-in-out;
        transition-delay: 0.2s;
      }
    }
  }

  &.from-left {
    .gauge {
      left: 42px;
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
      right: 42px;
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

  &.small {
    width: 100%;
    align-items: center;

    &:last-of-type {
      margin-bottom: 0;
    }

    img {
      width: 32px;
      height: 32px;
    }

    .gauge {
      max-width: 95%;
      height: 16px;

      .progress {
        height: 8px;
        max-width: 95%;
      }
    }

    &.from-left {
      .gauge {
        left: 16px;
      }
    }
  }
}
</style>
