<template>
  <div class="activities-container">
    <CardContainer class="activities-slots-container" :accent="false">
      <div v-for="index in 3" :key="index">
        <!-- p à remplacer par l'image -->
        <p
          v-if="store.trip.activities[index - 1]"
          :src="EmptySlot"
          alt=""
          class="slot"
        >
          {{ store.trip.activities[index - 1].title }}
        </p>
        <img v-else :src="EmptySlot" alt="" class="slot" />
      </div>
    </CardContainer>

    <ActivitiesSwiper :activities="availableActivities" />

    <Button @click="selectActivity">C'est décidé !</Button>
  </div>

  <ActivitiesModalContainer
    @validate-activity="validateActivity"
    :open="isOpen"
    :outcome="outcome"
  />
</template>

<script>
import { useStore } from './../../../store/index'
import { getRandomInt } from '@/helpers'

import { Button, Title, CardContainer } from '@/components/lib'
import ActivityCard from '@/components/Game/Activities/ActivityCard.vue'
import ActivitiesSwiper from '@/components/Game/Activities/ActivitiesSwiper.vue'
import ActivitiesModalContainer from '@/components/Game/Activities/ActivitiesModalContainer.vue'

import EmptySlot from '@/assets/empty-slot.png'

export default {
  name: 'ActivitiesContainer',
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
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
      outcome: null,
      availableActivities: this.elements,
    }
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    setIsOpen(value) {
      this.isOpen = value
    },
    selectActivity() {
      let activity = { ...this.store.selected }

      let outcome
      if (activity.outcomes.length > 1) {
        const goodOutcome = activity.outcomes[0]
        const badOutcome = activity.outcomes[1]

        const dice = getRandomInt(11)
        outcome = dice > activity.risk ? goodOutcome : badOutcome
      } else {
        outcome = activity.outcomes[0]
      }

      activity.budget += outcome.budget
      activity.wellness += outcome.wellness
      activity.pollution += outcome.pollution
      this.store.selected = activity

      this.outcome = outcome
      this.setIsOpen(true)
    },
    validateActivity() {
      this.store.trip.activities.push(this.store.selected)

      const selectedIndex = this.availableActivities.findIndex(el => el.attributes.createdAt === this.store.selected.createdAt)

      this.setIsOpen(false)
      this.outcome = null
      this.store.selected = this.availableActivities[selectedIndex + 1].attributes

      this.availableActivities.splice(selectedIndex, 1)

      if (this.store.activitiesCount === 3) {
        this.store.finishStep()
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
