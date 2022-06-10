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
        <BaseCard
          v-if="isSelected"
          class="activity-outcome-card-container"
          :title="activity.attributes.outcomes[0].title"
          :description="activity.attributes.outcomes[0].description"
        >
          <ScoreEvolutionGroup
            :budget="activity.attributes.outcomes[0].budget"
            :pollution="activity.attributes.outcomes[0].pollution"
            :wellness="activity.attributes.outcomes[0].wellness"
          />

          <div class="status">
            <CheckIcon class="hero-icon" />
          </div>
        </BaseCard>

        <CardWithImageAndBudget
          v-else
          class="activity-card-container"
          :image="getImage(activity)"
          :title="activity.attributes.title"
          :description="activity.attributes.description"
          :budget="activity.attributes.budget"
          :pollution="activity.attributes.pollution"
          :wellness="activity.attributes.wellness"
        >
          <template #cardFooter>
            <Button simple @click="selectActivity">Choisir</Button>
          </template>
        </CardWithImageAndBudget>
      </SwiperSlide>
    </template>
  </Carousel>
</template>

<script>
import { useStore } from '@/store'
import { getImage } from '@/helpers'

import {
  Carousel,
  CardWithImageAndBudget,
  BaseCard,
  Button,
  ScoreEvolutionGroup,
} from '@/components/lib'
import { CheckIcon } from '@heroicons/vue/outline'

import { SwiperSlide } from 'swiper/vue'
import ActivitiesCounter from '@/components/Game/Activities/ActivitiesCounter.vue'

export default {
  name: 'ActivitiesSwiper',
  components: {
    Carousel,
    CardWithImageAndBudget,
    BaseCard,
    Button,
    SwiperSlide,
    ActivitiesCounter,
    ScoreEvolutionGroup,
    CheckIcon,
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
      isSelected: true,
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

<style lang="scss">
.activities-swiper-container {
  .activity-card-container {
    .button-container {
      margin: 16px auto 0;
    }
  }

  .activity-outcome-card-container {
    height: 100%;
    padding-bottom: 56px;

    .status {
      position: absolute;
      bottom: 16px;
      right: 24px;

      .hero-icon {
        height: 32px;
        width: 32px;
        color: var(--color-green-light);
      }
    }
  }
}
</style>
