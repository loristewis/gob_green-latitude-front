<template>
  <Title tag="h1">Titres</Title>

  <Title tag="h2">Titre niveau 2</Title>
  <Title tag="h3">Titre niveau 3</Title>

  <Title tag="h1">Paragraphe</Title>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi deserunt
    eligendi error impedit itaque nostrum, officiis pariatur quisquam vitae!
    Alias consectetur cum delectus dignissimos doloremque est officiis
    perspiciatis repellendus ut.
  </p>

  <Title tag="h1">Checklist</Title>
  <ChecklistElement>Priority boarding</ChecklistElement>
  <ChecklistElement>Extra bagage</ChecklistElement>
  <ChecklistElement>Siège XXL</ChecklistElement>
</template>

<script>
import { Title, ChecklistElement } from '@/components/lib'

export default {
  name: 'TextsCollection',
  components: { Title, ChecklistElement },
}
</script>
