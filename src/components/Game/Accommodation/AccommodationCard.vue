<template>
  <CardContainer class="accommodation-card-container">
    <div class="image" :style="{ backgroundImage: `url(${image})` }" />

    <div class="infos">
      <Price v-if="budget" :value="budget" />

      <Title tag="h2" class="title">
        {{ wording(title) }}
      </Title>

      <p v-if="description">{{ description }}</p>
    </div>
  </CardContainer>
</template>

<script>
import { CardContainer, Title, Price } from '@/components/lib'
import { useStore } from './../../../store/index'

export default {
  name: 'AccommodationCard',
  components: {
    CardContainer,
    Title,
    Price,
  },
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    budget: {
      type: Number,
    },
  },
  setup() {
    const store = useStore()
    const wording = store.wording

    return {
      wording,
    }
  },
}
</script>

<style lang="scss">
.accommodation-card-container {
  max-width: 288px;
  height: 448px;
  margin: auto;
  padding: 24px;
  overflow: scroll;

  &.selected {
    background-color: #8a95b4;
  }

  .image {
    height: 220px;
    width: 220px;
    max-width: 100%;
    background: no-repeat center;
    background-size: contain;
  }

  .infos {
    margin-top: 16px;

    .title {
      margin: 16px 0 8px;
    }
  }
}
</style>
