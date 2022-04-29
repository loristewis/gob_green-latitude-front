<script>
import { useStore } from './../../../store/index'

export default {
  name: 'ActivitiesContainer',
  props: ['elements'],
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
    <label :for="el.attributes.id"
      >{{ ' ' }}{{ store.wording(el.attributes.title) }} <br /><span>{{
        el.attributes.wishes.data.map((el) => el.attributes.title)
      }}</span>
      <span style="opacity: 0.4"
        >(bien-être :
        {{ el.attributes.wellness ? el.attributes.wellness : '?' }} / budget :
        {{ el.attributes.budget }} / pollution :
        {{ el.attributes.pollution }})</span
      >
    </label>
  </div>
  <p @click="validateActivities">Let's go</p>
</template>

<style></style>
