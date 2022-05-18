<template>
  <Title>Bouton</Title>

  <Button>On réserve !</Button>
  <Button :is-disabled="true">On réserve !</Button>

  <Title>Radio</Title>
  <RadioButton>Texte</RadioButton>
  <RadioButton :selected="true">Texte</RadioButton>
</template>

<script>
import { Title, Button, RadioButton } from '@/components/lib'

export default {
  name: 'ButtonCollection',
  components: { Title, Button, RadioButton },
}
</script>

<style scoped></style>
