<template>
  <div class="activities-swiper-container">
    <Carousel>
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
import { Carousel, CardWithImageAndBudget } from '@/components/lib'
import { SwiperSlide } from 'swiper/vue'
import { getImage } from '@/helpers/index.js'

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
}
</script>

<style scoped></style>
