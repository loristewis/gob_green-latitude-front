<template>
  <Title>Commentaires</Title>

  <Tag color="red">Il ne reste plus que 2 hébergements !</Tag>
  <Tag color="green">Pensez à la planète !</Tag>
  <Tag color="purple">Voyagez en toute sérénité</Tag>
  <Tag color="blue">Voyagez en toute sérénité</Tag>
</template>

<script>
import { Title, Tag } from '../lib'

export default {
  name: 'TagCollection',
  components: { Title, Tag },
}
</script>
