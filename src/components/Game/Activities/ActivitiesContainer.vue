<template>
  <div class="activities-container">
    <CardContainer class="activities-slots-container" :accent="false">
      <img :src="EmptySlot" alt="" class="slot" />
      <img :src="EmptySlot" alt="" class="slot" />
      <img :src="EmptySlot" alt="" class="slot" />
    </CardContainer>

    <ActivitiesSwiper :activities="elements" />

    <!--        <div v-for="el in elements" :key="el.attributes.id">
          <input
            type="checkbox"
            name="activities"
            v-model="store.trip.activities"
            :id="el.attributes.id"
            :value="el.attributes"
          />

          <activity-card :activity="el.attributes"></activity-card>
        </div>-->

    <!--    <Button main @click="validateActivities">C'est décidé !</Button>-->
    <Button @click="setIsOpen(true)">C'est décidé !</Button>
  </div>

  <ActivitiesModalContainer :open="isOpen" />
  <!--  <div
    class="activities-modal-container"
    :class="{ hidden: !isOpen }"
    @click="validateActivity"
  >
    <div class="backdrop" />

    <CardContainer class="activities-modal-card-container">
      <Title tag="h2" class="name">Titre</Title>

      <p>Description</p>

      <ScoreEvolutionGroup
        v-bind="$props"
        budget="1"
        pollution="1"
        wellness="1"
      />
    </CardContainer>
  </div>-->
</template>

<script>
import { useStore } from './../../../store/index'

import { Button, Title, CardContainer } from '@/components/lib'
import ActivityCard from '@/components/Game/Activities/ActivityCard.vue'
import ActivitiesSwiper from '@/components/Game/Activities/ActivitiesSwiper.vue'
import ActivitiesModalContainer from '@/components/Game/Activities/ActivitiesModalContainer.vue'

import EmptySlot from '@/assets/empty-slot.png'

export default {
  name: 'ActivitiesContainer',
  props: ['elements'],
  components: {
    CardContainer,
    Button,
    Title,
    ActivityCard,
    ActivitiesSwiper,
    ActivitiesModalContainer,
  },
  data() {
    return {
      EmptySlot,
      isOpen: false,
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
    setIsOpen(value) {
      this.isOpen = value
    },
    validateActivity() {
      // this.setIsOpen(true)
      this.setIsOpen(!this.isOpen)
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

.activities-modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1s;
  opacity: 0;

  &:not(.hidden) {
    opacity: 1;
  }

  //&:hover {
  //  opacity: 1;
  //}

  .backdrop {
    background-color: var(--color-beige-dark);
    position: absolute;
    inset: 0;
    opacity: 0.4;
  }

  position: absolute;
  inset: 0;
  z-index: 10;

  .activities-modal-card-container {
    min-width: 296px;
    padding: 24px 20px;
  }
}
</style>
