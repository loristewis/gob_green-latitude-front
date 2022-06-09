<template>
  <GameLayout class="incident-container">
    <template #default>
      <div v-if="!incident.outcome" class="incident-choice-container">
        <IncidentCard
          :title="incident.situation.title"
          :description="incident.situation.description"
        />

        <IncidentChoiceCard
          v-for="choice in incident.situation.choices"
          :key="choice.id"
          :choice="choice"
          @select="getOutcome(choice)"
        />
      </div>

      <div v-else class="incident-outcome-container">
        <IncidentOutcomeCard
          :title="incident.outcome.title"
          :description="incident.outcome.description"
          :budget="incident.outcome.budget"
          :pollution="incident.outcome.pollution"
          :wellness="incident.outcome.wellness"
          @next-step="store.finishStep"
        />
      </div>

      <GradientOverlay v-if="isPhone" />
    </template>
  </GameLayout>
</template>

<script>
import { screenSize } from '@/mixins/index.js'
import { useStore } from '@/store/index'
import { getRandomFromArray, getRandomInt } from '@/helpers'
import { Title, Button, GradientOverlay } from '@/components/lib'

import GameLayout from '@/components/GameLayout.vue'
import IncidentCard from '@/components/Game/Incident/IncidentCard.vue'
import IncidentChoiceCard from '@/components/Game/Incident/IncidentChoiceCard.vue'
import IncidentOutcomeCard from '@/components/Game/Incident/IncidentOutcomeCard.vue'

export default {
  name: 'IncidentContainer',
  props: ['elements'],
  mixins: [screenSize],
  components: {
    GameLayout,
    Title,
    Button,
    IncidentCard,
    IncidentChoiceCard,
    IncidentOutcomeCard,
    GradientOverlay,
  },
  setup() {
    const store = useStore()

    store.trip.incident.situation = getRandomFromArray(
      store.incidents
    ).attributes

    const incident = store.trip.incident

    return {
      store,
      incident,
    }
  },
  methods: {
    getOutcome(choice) {
      const goodOutcome = choice.outcomes[0]
      const badOutcome = choice.outcomes[1]

      const dice = getRandomInt(11)
      const outcome = dice > choice.risk ? goodOutcome : badOutcome
      this.store.trip.incident.outcome = outcome

      return outcome
    },
  },
}
</script>

<style lang="scss">
.incident-container {
  main {
    overflow: scroll;
  }

  .incident-choice-container,
  .incident-outcome-container {
    margin: 0 32px;
    padding-bottom: 96px;
  }
}
</style>
