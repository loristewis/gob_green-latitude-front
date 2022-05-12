<script>
export default {
  name: 'DestinationCard',
  props: ['destination', 'selected'],
}
</script>

<template>
  <div>
    <p>{{ destination.title }}</p>
    <p>{{ destination.description }}</p>
    <p v-if="destination.thoughts">({{ destination.thoughts }})</p>
    <p>{{ destination.category }}</p>
    <p v-if="selected">Sélectionné !</p>
    <hr />
  </div>
</template>

<style></style>
