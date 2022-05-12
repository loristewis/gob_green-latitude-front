<template>
  <Title tag="h1">Titres</Title>

  <Title tag="h2">Titre niveau 2</Title>
  <Title tag="h3">Titre niveau 3</Title>
  <Title tag="h4">Titre niveau 4</Title>
  <Title tag="h5">Titre niveau 5</Title>

  <Title tag="h1">Paragraphe</Title>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi deserunt
    eligendi error impedit itaque nostrum, officiis pariatur quisquam vitae!
    Alias consectetur cum delectus dignissimos doloremque est officiis
    perspiciatis repellendus ut.
  </p>
</template>

<script>
import { Title } from '../lib/'

export default {
  name: 'TextsCollection',
  components: { Title },
}
</script>

<style scoped></style>
