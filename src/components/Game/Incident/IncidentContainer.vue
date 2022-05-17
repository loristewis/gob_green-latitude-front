<script>
import { useStore } from '../../../store/index'
import { getRandomFromArray, getRandomInt } from '../../../helpers'

import { Title, Button } from '../../lib'
import IncidentChoice from './IncidentChoice.vue'

export default {
  name: 'IncidentContainer',
  props: ['elements'],
  components: { Title, Button, IncidentChoice },
  setup() {
    const store = useStore()

    store.trip.incident.event = getRandomFromArray(store.incidents).attributes

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

<template>
  <div v-if="!incident.outcome">
    <div>
      <Title tag="h2">{{ incident.event.title }}</Title>
      <p>{{ incident.event.description }}</p>
    </div>
    <IncidentChoice
      @select="getOutcome(choice)"
      :choice="choice"
      v-for="(choice, i) in incident.event.choices"
      :key="i"
    />
  </div>

  <div v-else>
    <Title tag="h2">{{ incident.outcome.title }}</Title>
    <p>{{ incident.outcome.description }}</p>
    <Button main @click="store.finishStep">Continuer</Button>
  </div>
</template>

<style></style>
