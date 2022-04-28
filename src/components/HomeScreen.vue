<template>
  <Title tag="h1">Green Latitude</Title>

  <Menu />

  <div style="background-color: #8a95b4; padding: 20px; margin-top: 48px">
    <Thought>Tu dois avoir une sacrée condition physique...</Thought>
  </div>

  <Tag color="red">Il ne reste plus que 2 hébergements !</Tag>
  <Tag color="green">Pensez à la planète !</Tag>
  <Tag color="purple">Voyagez en toute sérénité</Tag>
  <Tag color="blue">Voyagez en toute sérénité</Tag>

  <Button>On réserve !</Button>
  <Button :is-disabled="true">On réserve !</Button>
</template>

<script>
import Title from './lib/Title.vue'
import Button from './lib/Button.vue'
import Tag from './lib/Tag.vue'
import Thought from './lib/Thought.vue'
import Menu from './lib/Menu.vue'

export default {
  name: 'HomeScreen',
  components: {
    Title,
    Button,
    Tag,
    Thought,
    Menu,
  },
}
</script>
