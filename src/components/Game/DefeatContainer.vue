<template>
  <CardContainer>
    <Sticker>{{ infos.title }}</Sticker>
    <p>{{ infos.description }}</p>
    <img :src="infos.image" alt="" />
    <Button simple @click="finishGame">Voir le bilan de fin</Button>
  </CardContainer>
</template>

<script>
import { useStore } from './../../store'
import { CardContainer, Sticker, Button } from '@/components/lib'

export default {
  name: 'DefeatContainer',
  components: { CardContainer, Sticker, Button },
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
      this.store.moveToStep('animation-end')
    },
  },
}
</script>
