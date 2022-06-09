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
import { Swiper } from 'swiper/vue'

import 'swiper/scss'
import 'swiper/scss/pagination'

export default {
  name: 'Carousel',
  components: {
    Swiper,
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
  height: 100%;
  display: flex;
  align-items: center;

  .swiper {
    --carousel-margin-bottom: 96px;
    height: calc(100% - var(--carousel-margin-bottom));
    width: 272px;
    margin-bottom: var(--carousel-margin-bottom);
    padding-bottom: 48px;
    overflow: visible;

    .swiper-slide {
      transition: transform 1s;
      transform: scale(0.9);

      &-prev {
        transform: scale(0.9) translateX(16px);
      }

      &-next {
        transform: scale(0.9) translateX(-16px);
      }

      &-active {
        transform: scale(1);
      }
    }

    .swiper-pagination {
      display: none;

      &.swiper-pagination-bullets {
        display: block;
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
