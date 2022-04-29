<script>
export default {
  name: 'DestinationCard',
  props: ['destination'],
}
</script>

<template>
  <p>{{ destination.title }}</p>
  <p>{{ destination.description }}</p>
  <p v-if="destination.thoughts">({{ destination.thoughts }})</p>
  <p>{{ destination.category }}</p>
  <hr />
</template>

<style></style>
