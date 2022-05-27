<template>
  <div>
    Postcard!
    <Button @click="newGame">Nouvelle partie ?</Button>
  </div>
</template>

<script>
import { useStore } from '@/store'

import { Button } from '@/components/lib'

export default {
  name: 'PostcardContainer',
  components: { Button },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    newGame() {
      console.log('nouvelle partie !')
      this.store.skipIntro = true
      this.store.resetState()
      this.$emit('new-game')
    },
  },
}
</script>
