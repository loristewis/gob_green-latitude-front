<template>
  <div class="accommodation-gauge-container">
    <Tag
      color="red"
      class="accommodation-gauge-warning"
      :style="{
        opacity: left < 4 ? 1 : 0,
      }"
    >
      {{ alert }}
    </Tag>
    <div class="accommodation-gauge">
      <span
        v-for="(el, i) in total"
        :key="i"
        :class="i < left ? 'red' : ''"
      ></span>
    </div>
  </div>
</template>

<script>
import { Tag } from '@/components/lib'

export default {
  name: 'AccommodationGauge',
  components: {
    Tag,
  },
  props: {
    left: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  computed: {
    alert() {
      if (this.left === 1) {
        return 'Plus trop le choix...'
      } else {
        return `Il ne reste plus que ${this.left} hébergements !`
      }
    },
  },
}
</script>

<style lang="scss">
.accommodation-gauge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;

  .accommodation-gauge-warning {
    margin-bottom: 4px;
    transition: opacity 0.2s;

    & .hidden {
      opacity: 0;
    }
  }

  .accommodation-gauge {
    display: flex;

    span {
      display: block;
      height: 8px;
      width: 18px;
      background-color: var(--color-beige-dark);
      transition: background-color 0.2s;

      & + span {
        margin-left: 1px;
      }

      &.red {
        background-color: var(--color-rose);
      }

      &:first-child {
        border-top-left-radius: 18px;
        border-bottom-left-radius: 18px;
      }

      &:last-child {
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
      }
    }
  }
}
</style>
