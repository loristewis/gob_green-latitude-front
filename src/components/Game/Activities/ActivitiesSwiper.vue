<template>
  <div class="activities-swiper-container">
    <Carousel @swiper="onSwiper" @slideChange="onSlideChange">
      <SwiperSlide v-for="activity in activities" :key="activity.id">
        <CardWithImageAndBudget
          class="activity-card-container"
          :image="getImage(activity)"
          :title="activity.attributes.title"
          :description="activity.attributes.description"
          :budget="activity.attributes.budget"
          :pollution="activity.attributes.pollution"
          :wellness="activity.attributes.wellness"
        />
      </SwiperSlide>
    </Carousel>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { getImage } from '@/helpers'

import { Carousel, CardWithImageAndBudget } from '@/components/lib'
import { SwiperSlide } from 'swiper/vue'

export default {
  name: 'ActivitiesSwiper',
  components: {
    Carousel,
    CardWithImageAndBudget,
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

<style scoped></style>
