<template>
  <GameLayout>
    <template #default>
      <DestinationSwiper :destinations="elements" />

      <Button
        main
        :isDisabled="this.buttonDisabled"
        @click="emitDestinationChoice"
      >
        Allons-y !
      </Button>
    </template>
  </GameLayout>
</template>

<script>
import { useStore } from '@/store'

import { Button } from '@/components/lib'
import GameLayout from '@/components/GameLayout.vue'
import DestinationSwiper from './DestinationSwiper.vue'

export default {
  name: 'DestinationContainer',
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  components: {
    Button,
    GameLayout,
    DestinationSwiper,
  },
  data() {
    return {
      buttonDisabled: false,
    }
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    emitDestinationChoice() {
      if (!this.store.selected) {
        console.log('stp choisis une destination')
        return
      }

      this.buttonDisabled = true
      this.store.trip.destination = this.store.selected
      this.store.selected = null
      this.$emit('validate-destination')
    },
  },
}
</script>
