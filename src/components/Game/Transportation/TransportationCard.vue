<script>
export default {
  name: 'TransportationCard',
  props: ['transportation', 'selected'],
}
</script>

<template>
  <div>
    <p>{{ transportation.title }}</p>
    <p>{{ transportation.description }}</p>
    <p v-if="transportation.thoughts">({{ transportation.thoughts }})</p>
    <p>Budget : {{ transportation.budget }}</p>
    <div v-if="selected">
      <div v-if="transportation.options.data.length > 0">
        <div v-for="(option, i) in transportation.options.data" :key="i">
          <p>{{ option.attributes.title }}</p>
        </div>
      </div>
      <p>Sélectionné !</p>
    </div>
    <hr />
  </div>
</template>

<style></style>
