<script>
import { useStore } from './../../../store/index'

import { Button } from '@/components/lib'
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
  <Button main @click="validateActivities">C'est décidé !</Button>
</template>

<style></style>
