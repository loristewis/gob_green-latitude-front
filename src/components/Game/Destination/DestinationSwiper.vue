<template>
  <Carousel
    class="destination-swiper-container"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <SwiperSlide v-for="destination in destinations" :key="destination.id">
      <DestinationCard
        :title="destination.attributes.title"
        :description="destination.attributes.description"
        :category="destination.attributes.category"
        :image="getImage(destination)"
      />
    </SwiperSlide>
  </Carousel>
</template>

<script>
import { useStore } from '@/store/index'
import { getImage } from '@/helpers'

import { Carousel } from '@/components/lib'
import { SwiperSlide } from 'swiper/vue'

import DestinationCard from './DestinationCard.vue'

export default {
  name: 'DestinationSwiper',
  components: {
    Carousel,
    SwiperSlide,
    DestinationCard,
  },
  props: {
    destinations: {
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
      if (props.destinations.length > 0) {
        store.selected = props.destinations[swiper.realIndex].attributes
        store.thought = store.selected.thoughts
          ? store.selected.thoughts
          : store.thought
      }
    }
    const onSlideChange = (e) => {
      console.log('slide change')
      if (store.soundon) store.audio.swish.play()
      store.selected = props.destinations[e.realIndex].attributes
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
    this.store.selected = this.destinations[0].attributes
    this.store.thought = this.store.selected.thoughts
      ? this.store.selected.thoughts
      : this.store.thought
  },
}
</script>
