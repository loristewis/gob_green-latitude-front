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
      }
    }
    const onSlideChange = (e) => {
      console.log('slide change')
      store.selected = props.activities[e.realIndex].attributes
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
  },
}
</script>

<style scoped></style>
