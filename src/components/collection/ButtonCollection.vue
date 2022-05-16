<template>
  <Title>Bouton</Title>

  <Button>On réserve !</Button>
  <Button :is-disabled="true">On réserve !</Button>

  <Title>Radio</Title>
  <RadioButton :selected="false" />
  <RadioButton :selected="true" />

</template>

<script>
import { Title, Button, RadioButton } from '../lib'

export default {
  name: 'ButtonCollection',
  components: { Title, Button, RadioButton },
}
</script>

<style scoped></style>
