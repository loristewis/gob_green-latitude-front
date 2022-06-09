<template>
  <GameLayout class="incident-container">
    <div v-if="!incident.outcome">
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

    <div v-else>
      <IncidentOutcomeCard
        :title="incident.outcome.title"
        :description="incident.outcome.description"
        :budget="incident.outcome.budget"
        :pollution="incident.outcome.pollution"
        :wellness="incident.outcome.wellness"
        @next-step="store.finishStep"
      />
    </div>
  </GameLayout>
</template>

<script>
import { useStore } from '@/store/index'
import { getRandomFromArray, getRandomInt } from '@/helpers'
import { Title, Button } from '@/components/lib'

import GameLayout from '@/components/GameLayout.vue'
import IncidentCard from '@/components/Game/Incident/IncidentCard.vue'
import IncidentChoiceCard from '@/components/Game/Incident/IncidentChoiceCard.vue'
import IncidentOutcomeCard from '@/components/Game/Incident/IncidentOutcomeCard.vue'

export default {
  name: 'IncidentContainer',
  props: ['elements'],
  components: {
    GameLayout,
    Title,
    Button,
    IncidentCard,
    IncidentChoiceCard,
    IncidentOutcomeCard,
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
  padding: 0 32px;
}
</style>
