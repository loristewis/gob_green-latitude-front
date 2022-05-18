<template>
  <div class="accommodation-card-stack-container">
    <!--    <div class="accommodation-status">
      <div class="icon">
        <TrashIcon />
      </div>

      <div class="icon">
        <CheckIcon />
      </div>
    </div>-->

    <div class="accommodation-cards">
      <Swipeable
        class="swipeable-card"
        v-for="el in elements"
        :key="el.id"
        :swipe-y="false"
        v-on:swipe="onSwipe"
        v-on:start="onStart"
        v-on:move="onMove"
        v-on:end="onEnd"
        v-on:swiping-right="onSwipingRight"
        v-on:swiping-left="onSwipingLeft"
        v-on:swipe-right="onSwipeRight"
        v-on:swipe-left="onSwipeLeft"
      >
        <AccommodationCard
          :title="el.attributes.title"
          :description="el.attributes.description"
          :thoughts="el.attributes.thoughts"
          :budget="el.attributes.budget"
          :image="getImage(el)"
          @click="selectElement(el)"
          :selected="el === this.selected"
        />
      </Swipeable>
    </div>

    <div class="accommodation-buttons">
      <div id="no" class="icon" :style="trashIconStyle">
        <TrashIcon />
      </div>

      <div id="yes" class="icon" :style="checkIconStyle">
        <CheckIcon />
      </div>
    </div>
  </div>
</template>

<script>
import { Swipeable } from '@/components/lib'
import { getImage } from '@/helpers'

import AccommodationCard from './AccommodationCard.vue'

import { TrashIcon, CheckIcon } from '@heroicons/vue/solid'

export default {
  name: 'AccommodationCardStack',
  components: {
    Swipeable,
    AccommodationCard,
    TrashIcon,
    CheckIcon,
  },
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      getImage,
      selected: null,
      trashIconStyle: {},
      checkIconStyle: {},
    }
  },
  methods: {
    selectElement(element) {
      this.selected = element
    },
    onSwipingLeft() {
      this.trashIconStyle = {
        backgroundColor: 'var(--color-red)',
      }
      this.checkIconStyle = {}
    },
    onSwipingRight() {
      this.trashIconStyle = {}
      this.checkIconStyle = {
        backgroundColor: 'var(--color-green-dark)',
      }
    },
    onSwipe(direction) {
      console.log(direction)
    },
    onSwipeLeft() {
      setTimeout(() => {
        this.elements.pop()
      }, 300)
    },
    onSwipeRight() {
      // si l'utilisateur swipe-right
    },
    onEnd() {
      this.checkIconStyle = {}
      this.trashIconStyle = {}
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
      transition: background-color 0.2s;
    }
  }
}
</style>
