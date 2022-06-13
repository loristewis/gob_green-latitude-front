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
        />
      </div>

      <GradientOverlay />
    </template>
  </GameLayout>
</template>

<script>
import IncidentCard from '@/components/Game/Incident/IncidentCard.vue'
import IncidentChoiceCard from '@/components/Game/Incident/IncidentChoiceCard.vue'
import IncidentOutcomeCard from '@/components/Game/Incident/IncidentOutcomeCard.vue'

import GameLayout from '@/components/GameLayout.vue'
import { Button, GradientOverlay, Title } from '@/components/lib'
import { getRandomFromArray, getRandomInt } from '@/helpers'
import { useStore } from '@/store/index'

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
  mounted() {
    if (this.store.soundon) {
      this.store.audio.incident.play()
    }
  },
  methods: {
    getOutcome(choice) {
      const goodOutcome = choice.outcomes[0]
      const badOutcome = choice.outcomes[1]

      const dice = getRandomInt(11)
      this.store.trip.incident.outcome =
        dice > choice.risk ? goodOutcome : badOutcome

      this.store.finishStep({ next: false })
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
    padding-bottom: 104px;
  }
}
</style>
