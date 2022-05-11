<script>
export default {
  name: 'AccommodationCard',
  props: ['accommodation'],
}
</script>

<template>
  <p>{{ accommodation.title }}</p>
  <p>{{ accommodation.description }}</p>
  <p v-if="accommodation.thoughts">({{ accommodation.thoughts }})</p>
  <p>Budget : {{ accommodation.budget }}</p>
  <hr />
</template>

<style></style>
