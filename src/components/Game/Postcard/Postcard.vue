<template>
  <div class="postcard" :class="result">
    <div class="postcard-grid">
      <div class="postcard-grid-destination">
        <img v-if="trip.destination" :src="getImage(trip.destination)" alt="" />
      </div>

      <div class="postcard-grid-accommodation">
        <img
          v-if="trip.accommodation"
          :src="getImage(trip.accommodation)"
          alt=""
        />
      </div>

      <div
        class="postcard-grid-transportation"
        :style="{ backgroundColor: transportColor }"
      >
        <img
          v-if="trip.transportation"
          :src="getImage(trip.transportation)"
          alt=""
        />
      </div>

      <div
        class="postcard-grid-blank"
        :style="{ backgroundColor: randomColor }"
      />
    </div>

    <div class="postcard-destination-title">
      <img
        v-if="trip.destination"
        :src="getImage(trip.destination, titleFile)"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { colors } from '@/constants'
import { getImage, shuffleArray } from '@/helpers'

export default {
  name: 'Postcard',
  props: {
    trip: {
      type: Object,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      getImage,
      titleFile: 'image_' + this.result,
    }
  },
  computed: {
    transportColor() {
      return `var(--color-${this.trip.transportation.color})`
    },
    randomColor() {
      const postcardColors = shuffleArray([...colors.postcard])
      console.log(postcardColors)
      const selectedColor = postcardColors.find(
        (el) => el !== this.trip.transportation.color
      )
      console.log(selectedColor)
      return `var(--color-${selectedColor})`
    },
  },
}
</script>

<style lang="scss">
.postcard {
  background: var(--color-beige-cool);
  aspect-ratio: 7 / 5;
  display: grid;

  > div {
    grid-area: 1 / -1;
  }

  &-destination-title {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      padding: 12px;
    }
  }

  &.defeat {
    filter: grayscale(0.6);

    &-destination-title {
      img {
        padding: 42px;
      }
    }
  }

  &-grid {
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }

    &-destination {
      grid-column: 1 / 4;
      grid-row: 1 / 3;

      img {
        object-fit: cover;
      }
    }

    &-accommodation {
      grid-column: 4 / 7;
    }

    &-transportation {
      grid-column: 4 / 6;

      img {
        object-fit: contain;
        padding: 20px;
      }
    }
  }
}
</style>
