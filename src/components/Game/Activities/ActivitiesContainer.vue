<script>
import { useStore } from './../../../store/index'

import Button from './../../lib/Button.vue'
import ActivityCard from './ActivityCard.vue'

export default {
  name: 'ActivitiesContainer',
  props: ['elements'],
  components: {
    Button,
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
        this.store.finishStep()
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
  <Button @click="validateActivities">Let's go</Button>
</template>

<style></style>
