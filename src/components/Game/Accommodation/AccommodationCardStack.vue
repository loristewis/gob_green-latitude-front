<template>
  <div class="accommodation-card-stack-container">
    <AccommodationGauge :total="this.total" :left="elements.length" />

    <div class="accommodation-cards">
      <Swipeable
        ref="swipeable"
        class="swipeable-card"
        v-for="el in elements"
        :key="el.id"
        :swipe-y="false"
        v-on:swiping-right="onSwipingRight"
        v-on:swiping-left="onSwipingLeft"
        v-on:swipe-right="onSwipeRight"
        v-on:swipe-left="onSwipeLeft"
        v-on:end="onEnd"
      >
        <AccommodationCard
          :title="el.attributes.title"
          :description="el.attributes.description"
          :budget="el.attributes.budget"
          :image="getImage(el)"
        />
      </Swipeable>
    </div>

    <div class="accommodation-buttons">
      <div @click="onTrashClick" id="no" class="icon" :style="trashIconStyle">
        <TrashIcon />
      </div>

      <div @click="onCheckClick" id="yes" class="icon" :style="checkIconStyle">
        <CheckIcon />
      </div>
    </div>
  </div>
</template>

<script>
import { Swipeable, Tag } from '@/components/lib'
import { getImage } from '@/helpers'
import { useStore } from '@/store'

import AccommodationCard from './AccommodationCard.vue'
import AccommodationGauge from './AccommodationGauge.vue'

import { TrashIcon, CheckIcon } from '@heroicons/vue/solid'

export default {
  name: 'AccommodationCardStack',
  components: {
    Swipeable,
    Tag,
    AccommodationCard,
    AccommodationGauge,
    TrashIcon,
    CheckIcon,
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
      total: this.elements.length,
      getImage,
      trashIconStyle: {},
      checkIconStyle: {},
    }
  },
  mounted() {
    this.store.selected = this.elements[this.elements.length - 1]
  },
  methods: {
    onSwipingLeft() {
      this.trashIconStyle = {
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

      setTimeout(() => {
        this.elements.pop()
      }, 300)
    },
    onSwipeRight() {
      this.$emit('swipe-right')
    },
    onTrashClick() {
      const activeCard = this.$refs.swipeable[this.elements.length - 1]
      activeCard.isDragging = false
      activeCard.onThresholdReached("swipe-left")
    },
    onCheckClick() {
      const activeCard = this.$refs.swipeable[this.elements.length - 1]
      activeCard.isDragging = false
      activeCard.onThresholdReached("swipe-right")
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
  .accommodation-cards {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 450px;
    margin-bottom: 16px;
    position: relative;

    .swipeable-card {
      position: absolute;
      height: 100%;
      //height: 400px;
      //width: 250px;

      &:first-child::before {
        content: '';
        display: block;
        position: absolute;
        pointer-events: none;
        height: 100%;
        width: 100%;
        background: var(--color-beige-light);
        transform: rotate(-5deg);
        border-radius: 24px;
      }
    }
  }

  .accommodation-buttons {
    display: flex;
    justify-content: center;
    gap: 24px;

    .icon {
      display: block;
      height: 48px;
      width: 48px;
      border-radius: 50%;
      padding: 12px;
      background-color: var(--color-beige-dark);
      color: var(--color-white);
      transition: background-color 0.2s, transform 0.2s;
    }
  }
}
</style>
