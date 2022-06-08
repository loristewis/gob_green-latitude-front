<template>
  <div
    @click="playSound"
    class="button-container"
    :class="{
      disabled: isDisabled,
      'bottom-right': main,
      chevron: simple ? false : chevron,
      tight: tight,
      simple: simple,
      small: small,
    }"
  >
    <div>
      <img :src="Suitcase" v-if="suitcase" />

      <p><slot /></p>

      <ChevronRightIcon v-if="chevron && !simple" class="hero-icon" />
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon } from '@heroicons/vue/solid'
import Validation from '@/assets/audio/validation.mp3'
import Suitcase from '@/assets/suitcase.svg'

export default {
  name: 'Button',
  components: {
    ChevronRightIcon,
  },
  data() {
    return {
      Suitcase,
    }
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    main: {
      type: Boolean,
      default: false,
    },
    tight: {
      type: Boolean,
      default: false,
    },
    simple: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    chevron: {
      type: Boolean,
      default: true,
    },
    suitcase: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.sound = new Audio(Validation)
  },
  methods: {
    playSound() {
      this.sound.play()
    },
  },
}
</script>

<style lang="scss">
.button-container {
  height: 64px;
  width: max-content;
  margin: 16px auto;
  padding: 8px;
  border-radius: 32px;
  color: var(--color-white);
  font-family: var(--font-title);
  font-weight: var(--font-bold);
  font-size: 20px;
  background-color: var(--color-rose);
  transform: rotate(-6.63deg);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &.bottom-right {
    position: absolute;
    bottom: 24px;
    right: -16px;
    margin: 0;
  }

  &.disabled {
    background-color: var(--color-rose-faded);
    pointer-events: none;
    cursor: default;
  }

  > div {
    height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 24px;
    border: 2px solid var(--color-white);

    p {
      margin: 0 8px;
    }
  }

  &.chevron > div {
    padding-right: 8px;
  }

  &.tight {
    height: 48px;

    > div {
      padding: 0 12px;
      height: 32px;

      p {
        margin: 0;
      }
    }
  }

  &.simple {
    transform: rotate(0);

    > div {
      padding: 0 24px;
    }
  }

  &.small {
    height: auto;
    padding: 0 16px;
    border: 2px solid var(--color-white);

    > div {
      border: 0;
    }
  }
}
</style>
