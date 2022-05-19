<template>
  <BaseCard
    :title="title"
    :description="description"
    class="incident-outcome-card-container"
  >
    <div class="scores">
      <ScoreEvolution v-if="budget !== 0" name="budget" :value="budget" />

      <ScoreEvolution
        v-if="pollution !== 0"
        name="pollution"
        :value="pollution"
      />

      <ScoreEvolution v-if="wellness !== 0" name="wellness" :value="wellness" />
    </div>

    <img :src="Star" alt="" class="star" />
  </BaseCard>
</template>

<script>
import { Title, BaseCard, Sticker } from '@/components/lib'
import ScoreEvolution from '@/components/lib/scores/ScoreEvolution.vue'

import Star from './../../../assets/star.svg'

export default {
  name: 'IncidentOutcomeCard',
  components: { Title, BaseCard, Sticker, ScoreEvolution },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    pollution: {
      type: Number,
      required: true,
    },
    wellness: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      Star,
    }
  },
}
</script>

<style lang="scss">
.incident-outcome-card-container {
  margin-top: 128px;
  margin-bottom: 32px;

  .scores {
    display: flex;
    justify-content: space-around;
    margin-top: 24px;
  }

  .star {
    position: absolute;
    top: -88px;
    right: -24px;
  }
}
</style>
