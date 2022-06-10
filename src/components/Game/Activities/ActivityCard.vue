<template>
  <div class="activity-card-container">
    <Transition name="flip">
      <CardWithImageAndBudget
        v-if="flipped === false"
        class="activity-card"
        :image="activity.image"
        :title="activity.title"
        :description="activity.description"
        :budget="activity.budget"
        :pollution="activity.pollution"
        :wellness="activity.wellness"
      >
        <template #cardFooter>
          <Button simple @click="flipCard">Choisir</Button>
        </template>
      </CardWithImageAndBudget>

      <BaseCard
        v-else
        class="activity-outcome-card"
        :title="outcome.title"
        :description="outcome.description"
      >
        <ScoreEvolutionGroup
          :budget="outcome.budget"
          :pollution="outcome.pollution"
          :wellness="outcome.wellness"
        />

        <div class="status">
          <CheckIcon class="hero-icon" />
        </div>
      </BaseCard>
    </Transition>
  </div>
</template>

<script>
import {
  BaseCard,
  CardWithImageAndBudget,
  ScoreEvolutionGroup,
  Button,
} from '@/components/lib'

import { CheckIcon } from '@heroicons/vue/outline'

export default {
  name: 'ActivityCard',
  components: {
    BaseCard,
    CardWithImageAndBudget,
    ScoreEvolutionGroup,
    Button,
    CheckIcon,
  },
  props: {
    activity: {
      type: Object,
      required: true,
    },
    outcome: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      flipped: false,
    }
  },
  methods: {
    flipCard() {
      this.flipped = true
    },
  },
}
</script>

<style lang="scss">
//.flip-enter,
//.flip-leave {
//  transform: rotateY(180deg);
//  opacity: 0;
//}

.flip-enter-active {
  transition: all 0.4s ease;
}

.flip-leave-active {
  display: none;
}

.flip-enter-from {
  opacity: 0;
  transform: rotateY(180deg);
}

.flip-leave-to {
  opacity: 0;
  transform: rotateY(180deg);
}

.activity-card-container {
  height: 100%;

  .activity-card {
    .button-container {
      margin: 16px auto 0;
    }
  }

  .activity-outcome-card {
    height: 100%;
    padding-bottom: 56px;

    .status {
      position: absolute;
      bottom: 16px;
      right: 24px;

      .hero-icon {
        height: 32px;
        width: 32px;
        color: var(--color-green-light);
      }
    }
  }
}
</style>
