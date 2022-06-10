<template>
  <Carousel
    class="activities-swiper-container"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <template #carouselHeader>
      <ActivitiesCounter />
    </template>

    <template #default>
      <SwiperSlide v-for="activity in activities" :key="activity.id">
        <!--          :is-flipped="isFlipped"-->
        <ActivityCard
          :activity="{
            image: getImage(activity),
            title: activity.attributes.title,
            description: activity.attributes.description,
            budget: activity.attributes.budget,
            pollution: activity.attributes.pollution,
            wellness: activity.attributes.wellness,
          }"
          :outcome="{
            title: activity.attributes.outcomes[0].title,
            description: activity.attributes.outcomes[0].description,
            budget: activity.attributes.outcomes[0].budget,
            pollution: activity.attributes.outcomes[0].pollution,
            wellness: activity.attributes.outcomes[0].wellness,
          }"
        />
      </SwiperSlide>
    </template>
  </Carousel>
</template>

<script>
import { useStore } from '@/store'
import { getImage } from '@/helpers'

import { Carousel, BaseCard, Button } from '@/components/lib'
import ActivitiesCounter from '@/components/Game/Activities/ActivitiesCounter.vue'
import ActivityCard from '@/components/Game/Activities/ActivityCard.vue'

import { SwiperSlide } from 'swiper/vue'

export default {
  name: 'ActivitiesSwiper',
  components: {
    Carousel,
    BaseCard,
    Button,
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
  data() {
    return {
      getImage,
      isFlipped: true,
    }
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
      if (store.soundon) store.audio.swish.play()
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
