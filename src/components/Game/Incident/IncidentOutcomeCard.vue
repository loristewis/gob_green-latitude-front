<template>
  <BaseCard
    :title="title"
    :description="description"
    class="incident-outcome-card-container"
  >
    <div class="scores">
      <div v-if="budget !== 0">{{ budget }}</div>

      <div v-if="pollution !== 0">{{ pollution }}</div>

      <div v-if="wellness !== 0">{{ wellness }}</div>
    </div>

    <img :src="Star" alt="" class="star" />
  </BaseCard>
</template>

<script>
import { Title, BaseCard, Sticker } from '@/components/lib'

import Star from './../../../assets/star.svg'

export default {
  name: 'IncidentOutcomeCard',
  components: { Title, BaseCard, Sticker },
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

    > div {
      height: 24px;
      width: 24px;
      background-color: var(--color-yellow);
    }
  }

  .star {
    position: absolute;
    top: -88px;
    right: -24px;
  }
}
</style>
