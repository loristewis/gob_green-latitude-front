<template>
  <Title>Bouton</Title>

  <Button>On réserve !</Button>
  <Button :is-disabled="true">On réserve !</Button>
</template>

<script>
import { Title, Button } from '../lib'

export default {
  name: 'ButtonCollection',
  components: { Title, Button },
}
</script>

<style scoped></style>
