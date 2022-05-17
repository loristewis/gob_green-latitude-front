<template>
  <div class="destination-swiper-container">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="24"
      :pagination="{ clickable: true }"
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
    </Swiper>
  </div>
</template>

<script>
import { useStore } from './../../../store/index'

import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/scss'
import 'swiper/scss/pagination'

import DestinationCard from './DestinationCard.vue'

import { getImage } from '../../../helpers'

export default {
  name: 'DestinationSwiper',
  components: {
    Swiper,
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
      }
    }
    const onSlideChange = (e) => {
      console.log('slide change')
      store.selected = props.destinations[e.realIndex].attributes
      console.log('active: ', store.selected)
    }
    return {
      store,
      onSwiper,
      onSlideChange,
      modules: [Pagination, A11y],
    }
  },
  updated() {
    this.store.selected = this.destinations[0].attributes
  },
}
</script>

<style lang="scss">
.destination-swiper-container {
  .swiper {
    width: 272px;
    padding-bottom: 48px;
    overflow: visible;

    .swiper-slide {
      transition: transform 1s;
      transform: scale(0.9);

      &-prev {
        transform: scale(0.9) translateX(24px);
      }

      &-next {
        transform: scale(0.9) translateX(-24px);
      }

      &-active {
        transform: scale(1);
      }
    }

    .swiper-pagination-bullet {
      transition: all 0.5s;

      &-active {
        width: var(--swiper-pagination-bullet-size-active);
        height: var(--swiper-pagination-bullet-size-active);
      }
    }
  }
}
</style>
