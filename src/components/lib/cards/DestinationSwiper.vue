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
      <SwiperSlide>
        <DestinationCard
          title="Bigorneau-sur-mer"
          title-color="blue"
          description="Partez à la mer sans investir dans de la crème solaire !"
        />
      </SwiperSlide>

      <SwiperSlide>
        <DestinationCard
          title="Bigorneau-sur-mer"
          title-color="blue"
          description="Partez à la mer sans investir dans de la crème solaire !"
        />
      </SwiperSlide>

      <SwiperSlide>
        <DestinationCard
          title="Bigorneau-sur-mer"
          title-color="blue"
          description="Partez à la mer sans investir dans de la crème solaire !"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/scss'
import 'swiper/scss/pagination'

import DestinationCard from './DestinationCard.vue'

export default {
  name: 'DestinationSwiper',
  components: {
    Swiper,
    SwiperSlide,
    DestinationCard,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination, A11y],
    }
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
