<template>
  <CardContainer class="destination-card-container">
    <div
      class="image"
      :style="{
        backgroundImage: `url(${image})`,
        // height: '2OOpx',
      }"
    />

    <div
      :class="`sticker sticker-${category}`"
      :style="{
        backgroundImage: `url(${gameIcons[category]})`,
      }"
    />

    <div class="infos">
      <div class="name-container">
        <div class="name">
          <span :style="{ color, backgroundColor }">{{ title }}</span>
        </div>
      </div>

      <p>
        {{ description }}
      </p>
    </div>
  </CardContainer>
</template>

<script>
import { getRandomFromArray } from '@/helpers'
import { colorCombos, gameIcons } from '@/constants'
import { CardContainer } from '@/components/lib'

export default {
  name: 'DestinationCard',
  components: { CardContainer },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  data() {
    const combo = getRandomFromArray(colorCombos)

    return {
      gameIcons,
      color: `var(--color-${combo.text})`,
      backgroundColor: `var(--color-${combo.background})`,
    }
  },
}
</script>

<style lang="scss">
.destination-card-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .image {
    flex-grow: 1;
    width: 100%;
    border-radius: 24px 24px 0 0;
    background: no-repeat center;
    background-size: cover;
  }

  .sticker {
    position: absolute;
    background: no-repeat center;
    background-size: contain;
    top: 24px;
    right: -16px;
    transform: rotate(12deg);

    &-loin {
      //top: -8px;
      //left: -8px;
      width: 143px;
      height: 72px;
    }

    &-bof,
    &-cher {
      //top: 96px;
      //right: -16px;
      width: 95px;
      height: 95px;
    }
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
    }
  }

  p {
    padding: 32px 24px 24px;
    font-size: 16px;
    min-height: 107px;
    display: flex;
    align-items: center;
  }
}
</style>
