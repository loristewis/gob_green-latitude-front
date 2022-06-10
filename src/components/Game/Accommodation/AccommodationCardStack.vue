<template>
  <div
    class="accommodation-card-stack-container"
    :class="accommodationSelected ? 'disabled' : ''"
  >
    <AccommodationGauge :total="this.total" :left="elements.length" />

    <div class="accommodation-cards">
      <Swipeable
        class="swipeable-card"
        ref="swipeable"
        v-for="el in elements"
        :key="el.id"
        :allow-swipe-y="false"
        :allow-swipe-left="elements.length !== 1"
        v-on:swiping-right="onSwipingRight"
        v-on:swiping-left="onSwipingLeft"
        v-on:swipe-right="onSwipeRight"
        v-on:swipe-left="onSwipeLeft"
        v-on:end="onEnd"
      >
        <CardWithImageAndBudget
          class="accommodation-card-container"
          :title="el.attributes.title"
          :description="el.attributes.description"
          :budget="el.attributes.budget"
          :image="getImage(el)"
        />
      </Swipeable>
    </div>

    <div class="accommodation-buttons">
      <IconButton
        @click="onTrashClick"
        :icon="TrashIcon"
        :style="trashIconStyle"
        class="trash"
        :class="{ disabled: this.elements.length === 1 }"
      />
      <IconButton
        @click="onCheckClick"
        :icon="CheckIcon"
        :style="checkIconStyle"
        class="check"
      />
    </div>
  </div>
</template>

<script>
import { Swipeable, IconButton, CardWithImageAndBudget } from '@/components/lib'
import { getImage } from '@/helpers'
import { useStore } from '@/store'

import AccommodationGauge from './AccommodationGauge.vue'

import { TrashIcon, CheckIcon } from '@heroicons/vue/solid'

export default {
  name: 'AccommodationCardStack',
  components: {
    Swipeable,
    IconButton,
    CardWithImageAndBudget,
    AccommodationGauge,
  },
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  data() {
    return {
      accommodationSelected: false,
      total: this.elements.length,
      getImage,
      TrashIcon,
      CheckIcon,
      trashIconStyle: {},
      checkIconStyle: {},
    }
  },
  mounted() {
    this.store.selected = this.elements[this.elements.length - 1]
    this.store.thought = this.store.selected.thoughts
      ? this.store.selected.thoughts
      : this.store.thought
  },
  methods: {
    onSwipingLeft() {
      this.trashIconStyle = this.elements.length !== 1 && {
        backgroundColor: 'var(--color-red)',
        transform: 'scale(1.2)',
      }
      this.checkIconStyle = {}
    },
    onSwipingRight() {
      this.trashIconStyle = {}
      this.checkIconStyle = {
        backgroundColor: 'var(--color-green-light)',
        transform: 'scale(1.2)',
      }
    },
    onSwipeLeft() {
      this.store.selected = this.elements[this.elements.length - 2]
      this.store.tought = this.store.selected.thought

      setTimeout(() => {
        this.elements.pop()
      }, 300)
    },
    onSwipeRight() {
      this.accommodationSelected = true
      this.$emit('swipe-right')
    },
    onTrashClick() {
      if (this.elements.length !== 1) {
        const activeCard = this.$refs.swipeable[this.elements.length - 1]
        activeCard.isDragging = false
        activeCard.onThresholdReached('swipe-left')
      }
    },
    onCheckClick() {
      const activeCard = this.$refs.swipeable[this.elements.length - 1]
      activeCard.isDragging = false
      activeCard.onThresholdReached('swipe-right')
    },
    onEnd() {
      setTimeout(() => {
        this.checkIconStyle = {}
        this.trashIconStyle = {}
      }, 100)
    },
  },
}
</script>

<style lang="scss">
.accommodation-card-stack-container {
  --card-stack-margin-bottom: 80px;
  height: calc(100% - var(--card-stack-margin-bottom));
  margin-bottom: var(--card-stack-margin-bottom);
  display: flex;
  flex-direction: column;
  justify-content: center;

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .accommodation-cards {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-bottom: 16px;
    position: relative;

    .swipeable-card {
      position: absolute;
      height: 100%;
      user-select: none;

      &:nth-child(2)::before {
        content: '';
        display: block;
        position: absolute;
        pointer-events: none;
        height: 100%;
        width: 100%;
        background: var(--color-beige-light);
        transform: rotate(-5deg);
        border-radius: 24px;
        transition: transform 0.1s;
      }

      &:active {
        &:nth-child(2)::before {
          transform: rotate(0deg);
        }
      }
    }

    .accommodation-card-container {
      height: 100%;
      max-width: 288px;
      margin: auto;
      overflow: scroll;
    }
  }

  .accommodation-buttons {
    display: flex;
    justify-content: center;
    gap: 24px;

    .icon-button-container {
      &.trash:not(.disabled) {
        &:hover {
          background-color: var(--color-red) !important;
        }

        &:active {
          transform: scale(1.2);
        }
      }

      &.check {
        &:hover {
          background-color: var(--color-green-light) !important;
        }

        &:active {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
