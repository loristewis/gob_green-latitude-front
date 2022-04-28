<template>
  <Title>Pensées</Title>

  <div class="background-container">
    <Thought>Tu dois avoir une sacrée condition physique...</Thought>
  </div>
</template>

<script>
import Title from '../lib/Title.vue'
import Thought from '../lib/Thought.vue'

export default {
  name: 'ThoughtCollection',
  components: { Title, Thought },
}
</script>

<style scoped>
div.background-container {
  background-color: #8a95b4;
  padding: 20px;
}
</style>
