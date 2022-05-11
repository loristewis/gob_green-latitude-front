<script>
export default {
  name: 'TransportationCard',
  props: ['transportation'],
}
</script>

<template>
  <p>{{ transportation.title }}</p>
  <p>{{ transportation.description }}</p>
  <p v-if="transportation.thoughts">({{ transportation.thoughts }})</p>
  <p>Budget : {{ transportation.budget }}</p>
  <hr />
</template>

<style></style>
