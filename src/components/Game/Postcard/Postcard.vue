<template>
  <div class="postcard">
    <div class="postcard-grid">
      <div class="postcard-grid-destination">
        <img v-if="trip.destination" :src="getImage(trip.destination)" />
      </div>
      <div class="postcard-grid-accommodation">
        <img v-if="trip.accommodation" :src="getImage(trip.accommodation)" />
      </div>
      <div class="postcard-grid-transportation">
        <img v-if="trip.transportation" :src="getImage(trip.transportation)" />
      </div>
    </div>
    <div class="postcard-destination-title">
      <img v-if="trip.destination" :src="getImage(trip.destination, title)" />
    </div>
  </div>
</template>

<script>
import { getImage } from '@/helpers'

export default {
  name: 'Postcard',
  props: {
    trip: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      getImage,
    }
  },
}
</script>

<style lang="scss">
.postcard {
  background: burlywood;
  aspect-ratio: 7 / 5;
  display: grid;

  > div {
    grid-area: 1 / -1;
  }

  &-destination-title {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-grid {
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);

    &-destination {
      grid-column: 1 / 4;
      grid-row: 1 / 3;
    }

    &-accommodation {
      grid-column: 4 / 7;
    }

    &-transportation {
      grid-column: 4 / 6;
    }
  }
}
</style>
