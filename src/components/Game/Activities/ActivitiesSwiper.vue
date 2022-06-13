<template>
  <Carousel
    class="activities-swiper-container"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <template #carouselHeader>
      <ActivitiesCounter
        :left="3 - store.activitiesCount"
        :displayAlert="store.activitiesCount < 3"
      />
    </template>

    <template #default>
      <SwiperSlide v-for="activity in activities" :key="activity.id">
        <ActivityCard :activity="activity.attributes" />
      </SwiperSlide>
    </template>
  </Carousel>
</template>

<script>
import { useStore } from '@/store'

import { Carousel } from '@/components/lib'
import ActivitiesCounter from '@/components/Game/Activities/ActivitiesCounter.vue'
import ActivityCard from '@/components/Game/Activities/ActivityCard.vue'

import Swipe from '@/assets/audio/swipe.mp3'

import { SwiperSlide } from 'swiper/vue'

export default {
  name: 'ActivitiesSwiper',
  components: {
    Carousel,
    ActivitiesCounter,
    ActivityCard,
    SwiperSlide,
  },
  props: {
    activities: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()

    const onSwiper = (swiper) => {
      if (props.activities.length > 0) {
        store.selected = props.activities[swiper.realIndex].attributes
        store.thought = store.selected.thoughts
          ? store.selected.thoughts
          : store.thought
      }
    }

    const onSlideChange = (e) => {
      console.log('slide change')

      if (store.soundon) {
        new Audio(Swipe).play()
      }
      store.selected = props.activities[e.realIndex].attributes
      store.thought = store.selected.thoughts
        ? store.selected.thoughts
        : store.thought
      console.log('active: ', store.selected)
    }

    return {
      store,
      onSwiper,
      onSlideChange,
    }
  },
  updated() {
    this.store.selected = this.activities[0].attributes
    this.store.thought = this.store.selected.thoughts
      ? this.store.selected.thoughts
      : this.store.thought
  },
}
</script>
