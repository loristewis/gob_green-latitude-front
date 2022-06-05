<template>
  <BaseCard
    :title="title"
    :description="description"
    class="incident-card-container"
  >
    <img :src="Star" alt="" class="star" />

    <Sticker theme="rose-yellow" class="sticker"> AAAAAAHH </Sticker>
  </BaseCard>
</template>

<script>
import { BaseCard, Sticker } from '@/components/lib'

import Star from '@/assets/star.svg'

export default {
  name: 'IncidentCard',
  components: { BaseCard, Sticker },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
.incident-card-container {
  margin-top: 128px;
  margin-bottom: 32px;

  .sticker {
    position: absolute;
    top: -24px;
    left: 24px;
  }

  .star {
    position: absolute;
    top: -112px;
    right: 72px;
  }
}
</style>
