<template>
  <Title>Commentaires</Title>

  <Tag color="red">Il ne reste plus que 2 hébergements !</Tag>
  <Tag color="green">Pensez à la planète !</Tag>
  <Tag color="purple">Voyagez en toute sérénité</Tag>
  <Tag color="blue">Voyagez en toute sérénité</Tag>

  <Title>Stickers</Title>

  <Sticker>Inoubliable</Sticker>
  <Sticker>Le moins cher</Sticker>
</template>

<script>
import { Title, Tag, Sticker } from '@/components/lib'

export default {
  name: 'TagCollection',
  components: { Title, Tag, Sticker },
}
</script>
