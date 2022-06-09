<template>
  <BaseCard
    :title="processedTitle"
    :description="processedDescription"
    class="incident-card-container"
  >
    <div class="incident-card-stickers">
      <Sticker big theme="rose-yellow" class="sticker"> AAAAAHH </Sticker>
      <img :src="Star" alt="" class="star" />
    </div>
  </BaseCard>
</template>

<script>
import { BaseCard, Sticker } from '@/components/lib'
import { useStore } from '@/store'

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
  setup() {
    const store = useStore()
    const wording = store.wording

    return {
      wording,
    }
  },
  data() {
    return {
      Star,
      processedTitle: this.wording(this.title),
      processedDescription: this.wording(this.description),
    }
  },
}
</script>

<style lang="scss">
.incident-card-container {
  margin-top: 112px;
  margin-bottom: 32px;

  .incident-card-stickers {
    position: absolute;
    top: -24px;

    .sticker {
      z-index: 2;
      animation: vibrate 0.7s ease-in-out;
    }

    .star {
      left: 104px;
      top: -128px;
      animation: tada 0.7s ease-in-out;
    }
  }
}
</style>
