<template>
  <div class="gauge-container" :class="`from-${from}`">
    <div class="gauge">
      <div class="progress" :style="progressStyle"></div>
    </div>

    <img :src="image" alt="" />
  </div>
</template>

<script>
export default {
  name: 'Gauge',
  props: {
    image: {
      type: String,
      required: true,
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
  computed: {
    containerStyle() {
      return {
        justifyContent: this.from,
      }
    },
    gaugeStyle() {
      return {
        justifyContent: this.from,
      }
    },
    progressStyle() {
      return {
        // width: `${(this.value + 50) / 100}%`,
        width: `${this.value * 10}%`,
      }
    },
  },
}
</script>

<style lang="scss">
.gauge-container {
  display: flex;
  width: 184px;

  img {
    width: 40px;
    height: 40px;
  }

  .gauge {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    width: 160px;
    height: 24px;
    padding: 4px;
    background-color: var(--color-beige-light);
    border-radius: 12px;

    .progress {
      height: 16px;
      background-color: var(--color-green-light);
      transition: width 0.6s;
    }
  }

  &.from-left {
    .gauge {
      left: 26px;
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
