<template>
  <BaseCard>
    <Sticker>{{ infos.title }}</Sticker>
    <p>{{ infos.description }}</p>
    <img :src="infos.image" alt="" />
    <Button @click="finishGame">Voir le bilan de fin</Button>
  </BaseCard>
</template>

<script>
import { useStore } from './../../store'
import { BaseCard, Sticker, Button } from './../lib'

export default {
  name: 'DefeatContainer',
  components: { BaseCard, Sticker, Button },
  props: {
    infos: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    finishGame() {
      this.store.defeat = null
      this.store.moveToStep('animation-end')
    },
  },
}
</script>
