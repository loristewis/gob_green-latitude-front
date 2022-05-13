<template>
  <CardContainer class="destination-card-container">
    <img class="image" :src="image" alt="" />

    <div class="name-container">
      <div class="name">
        <span :class="titleColor">{{ title }}</span>
      </div>
    </div>

    <p>
      {{ description }}
    </p>
  </CardContainer>
</template>

<script>
import CardContainer from './sub-components/CardContainer.vue'

export default {
  name: 'DestinationCard',
  components: { CardContainer },
  props: {
    title: {
      type: String,
      required: true,
    },
    titleColor: {
      type: String,
      required: true,
      validator(value) {
        return ['red', 'blue'].includes(value)
      },
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://picsum.photos/200/250',
    },
    sticker: {
      type: String,
    },
  },
}
</script>

<style lang="scss">
.destination-card-container {
  .image {
    width: 100%;
    border-radius: 24px 24px 0 0;
  }

  .name-container {
    display: flex;
    justify-content: center;
  }

  .name {
    position: absolute;
    bottom: -12px;
    max-width: 80%;
    transform: rotate(-3deg) translateX(-24px);
    text-transform: uppercase;
    font-family: var(--font-tag);
    font-size: 20px;
    text-align: center;

    > span {
      padding: 8px 12px;
      border-radius: 12px;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;

      &.red {
        color: var(--color-red);
        background-color: var(--color-rose-cool);
      }

      &.blue {
        color: var(--color-rose-cool);
        background-color: var(--color-blue-dark);
      }
    }
  }

  p {
    padding: 32px 24px 24px;
    font-size: 16px;
  }
}
</style>
