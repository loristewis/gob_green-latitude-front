<template>
  <CardContainer class="card-with-image-and-budget-container">
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
import { CardContainer, Price, Title } from '@/components/lib'
import { useStore } from '@/store/index.js'

export default {
  name: 'CardWithImageAndBudget',
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
.card-with-image-and-budget-container {
  max-width: 288px;
  margin: auto;
  padding: 24px;

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
