<template>
  <div class="activities-container">
    <CardContainer class="activities-slots-container" :accent="false">
      <img :src="EmptySlot" alt="" class="slot" />
      <img :src="EmptySlot" alt="" class="slot" />
      <img :src="EmptySlot" alt="" class="slot" />
    </CardContainer>

    <ActivitiesSwiper :activities="elements" />

    <div v-for="el in elements" :key="el.attributes.id">
      <input
        type="checkbox"
        name="activities"
        v-model="store.trip.activities"
        :id="el.attributes.id"
        :value="el.attributes"
      />

      <!--      <activity-card :activity="el.attributes"></activity-card>-->
    </div>

    <Button main @click="validateActivities">C'est décidé !</Button>
  </div>
</template>

<script>
import { useStore } from './../../../store/index'

import { Button, CardContainer } from '@/components/lib'
import ActivityCard from '@/components/Game/Activities/ActivityCard.vue'
import ActivitiesSwiper from '@/components/Game/Activities/ActivitiesSwiper.vue'

import EmptySlot from '@/assets/empty-slot.png'

export default {
  name: 'ActivitiesContainer',
  props: ['elements'],
  components: {
    CardContainer,
    Button,
    ActivityCard,
    ActivitiesSwiper,
  },
  data() {
    return {
      EmptySlot,
    }
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

<style lang="scss">
.activities-container {
  .activities-slots-container {
    display: flex;
    justify-content: space-around;
    grid-column-gap: 32px;
    margin: 0 24px 24px;
    padding: 20px 24px;
    background-color: var(--color-beige-dark);

    .slot {
      background-color: var(--color-beige-cool);
      border-radius: 4px;
      width: 33%;
    }

    //@include screen-sm {
    //  padding: 32px 40px;
    //  grid-column-gap: 40px;
    //}
  }
}
</style>
