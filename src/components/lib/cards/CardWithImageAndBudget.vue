<template>
  <CardContainer class="card-with-image-and-budget-container">
    <div class="image" :style="{ backgroundImage: `url(${image})` }" />

    <div class="infos">
      <Price v-if="budget" :value="budget" />

      <Title tag="h2" class="title">
        {{ processedTitle }}
      </Title>

      <p v-if="description">{{ processedDescription }}</p>
    </div>

    <div class="card-footer">
      <slot name="cardFooter" />
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
  data() {
    return {
      processedTitle: this.wording(this.title),
      processedDescription: this.wording(this.description),
    }
  },
}
</script>

<style lang="scss">
.card-with-image-and-budget-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 288px;
  max-width: 100%;
  margin: auto;
  padding: 24px 24px 32px;

  .image {
    flex-grow: 1;
    max-height: 240px;
    width: 100%;
    background: no-repeat center;
    background-size: contain;
  }

  .infos {
    margin-top: 16px;

    .price-indicator {
      position: absolute;
      top: -40px;
    }

    .title {
      margin-bottom: 8px;
    }
  }

  .card-footer {
    margin-top: auto;
  }
}
</style>
