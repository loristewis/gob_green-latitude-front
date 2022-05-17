<template>
  <CardContainer
    class="accommodation-card-container"
    :class="{ selected: selected }"
  >
    <div class="image" :style="{ backgroundImage: `url(${image})` }" />

    <div class="infos">
      <Price :value="budget" />

      <!--    <p>{{ wording(accommodation.title) }}</p>-->
      <Title tag="h2" class="title">
        {{ title }}
      </Title>

      <p>{{ description }}</p>
    </div>
  </CardContainer>
</template>

<script>
import { CardContainer, Title, Price } from './../../lib'
import { useStore } from './../../../store/index'

export default {
  name: 'AccommodationCard',
  components: {
    CardContainer,
    Title,
    Price,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thoughts: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
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
  margin: auto;
  padding: 24px;

  &.selected {
    background-color: #8a95b4;
  }

  .image {
    height: 240px;
    width: 240px;
    max-width: 100%;
    background: no-repeat center;
    background-size: contain;
  }

  .infos {
    margin: 8px 0;

    .title {
      margin: 16px 0 8px;
    }
  }
}
</style>
