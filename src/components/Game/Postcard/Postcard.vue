<template>
  <div class="postcard">
    <div class="postcard-grid">
      <p class="postcard-grid-destination">
        {{ trip.destination ? trip.destination.title : '' }}
      </p>
      <p class="postcard-grid-accommodation">
        {{ trip.accommodation ? trip.accommodation.title : '' }}
      </p>
      <p class="postcard-grid-transportation">
        {{ trip.transportation ? trip.transportation.title : '' }}
      </p>
    </div>
    <div class="postcard-destination-title">
      <h1>{{ trip.destination ? trip.destination.title : '' }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Postcard',
  props: {
    trip: {
      type: Object,
      required: true,
    },
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
