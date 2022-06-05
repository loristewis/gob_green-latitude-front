<template>
  <div class="carousel-container">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="24"
      :pagination="{ clickable: true }"
      v-bind="$attrs"
    >
      <!--      @swiper="onSwiper"-->
      <!--      @slideChange="onSlideChange"-->
      <slot />
    </Swiper>
  </div>
</template>

<script>
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/scss'
import 'swiper/scss/pagination'

export default {
  name: 'Carousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, A11y],
    }
  },
}
</script>

<style lang="scss">
.carousel-container {
  height: calc(100vh - 260px);
  display: flex;
  align-items: center;

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
