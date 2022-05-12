<template>
  <Title>Pensées</Title>

  <div class="background-container">
    <Thought>Tu dois avoir une sacrée condition physique...</Thought>
  </div>
</template>

<script>
import { Title, Thought } from '../lib'

export default {
  name: 'ThoughtCollection',
  components: { Title, Thought },
}
</script>

<style scoped>
div.background-container {
  background-color: #8a95b4;
  margin: 0 0 20px 0;
  padding: 20px;
}
</style>
