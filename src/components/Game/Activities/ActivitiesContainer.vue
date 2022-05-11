<script>
import { useStore } from './../../../store/index'

import ActivityCard from './ActivityCard.vue'

export default {
  name: 'ActivitiesContainer',
  props: ['elements'],
  components: {
    ActivityCard,
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    validateActivities() {
      if (this.store.activitiesCount === 3) {
        this.store.calculateScore()
        this.store.moveToNextStep()
      } else {
        console.log('stp choisis trois activités')
      }
    },
  },
}
</script>

<template>
  <h3>Activités</h3>
  <div v-for="el in elements" :key="el.attributes.id">
    <input
      type="checkbox"
      name="activities"
      v-model="store.trip.activities"
      :id="el.attributes.id"
      :value="el.attributes"
    />

    <activity-card :activity="el.attributes"></activity-card>
  </div>
  <p @click="validateActivities">Let's go</p>
</template>

<style></style>
