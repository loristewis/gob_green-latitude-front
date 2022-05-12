<script>
import { useStore } from './../../../store/index'

export default {
  name: 'AccommodationCard',
  props: ['accommodation', 'selected'],
  setup() {
    const store = useStore()
    const wording = store.wording
    return {
      wording,
    }
  },
}
</script>

<template>
  <div>
    <p>{{ wording(accommodation.title) }}</p>
    <p>{{ accommodation.description }}</p>
    <p v-if="accommodation.thoughts">({{ accommodation.thoughts }})</p>
    <p>Budget : {{ accommodation.budget }}</p>
    <p v-if="selected">Sélectionné !</p>
    <hr />
  </div>
</template>

<style></style>
