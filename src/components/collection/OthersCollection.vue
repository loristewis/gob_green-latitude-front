<template>
  <Title tag="h1">Budget</Title>

  <Price v-for="index in 3" :key="index" :value="index"></Price>
</template>

<script>
import { Title, Price } from '../lib/'

export default {
  name: 'OthersCollection',
  components: { Title, Price },
}
</script>

<style scoped></style>
