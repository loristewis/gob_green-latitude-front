<template>
  <BaseCard class="back-to-home-modal" title="Retourner à l'accueil ?">
    <Button simple @click="quitGame">Valider</Button>

    <p @click="$emit('close-modal')">Continuer la partie</p>
  </BaseCard>
</template>

<script>
import { BaseCard, Button } from '@/components/lib'

import router from '@/router'
import { useStore } from '@/store'

export default {
  name: 'BackToHomeModal',
  components: {
    BaseCard,
    Button,
  },
  data() {
    return {
      router,
    }
  },
  setup() {
    const store = useStore()

    return {
      store,
    }
  },
  methods: {
    quitGame() {
      this.store.resetState()
      router.push('/')
    },
  },
}
</script>

<style lang="scss">
.back-to-home-modal {
  text-align: center;

  .title-container {
    margin-bottom: 32px;
  }

  p {
    cursor: pointer;
  }
}
</style>
