<script>
import { useStore } from './../../../store/index'

export default {
  name: 'TransportationCard',
  props: ['transportation', 'selected'],
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
    <p>{{ wording(transportation.title) }}</p>
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
