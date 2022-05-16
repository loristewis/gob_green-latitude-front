<template>
  <div class="transport-card-option" @click="$emit('select-option')">
    <p v-if="selected">sélectionné!</p>
    <div>
      <Tag color="green" v-if="option.attributes.tagline">{{
        option.attributes.tagline
      }}</Tag>
      <Title tag="h3">{{ option.attributes.title }}</Title>
      <p>{{ option.attributes.description }}</p>
      <ChecklistElement>Priority boarding</ChecklistElement>
      <ChecklistElement>Extra bagage</ChecklistElement>
      <ChecklistElement>Siège XXL</ChecklistElement>
    </div>
  </div>
</template>

<script>
import { Title, Tag, ChecklistElement } from './../../lib'

export default {
  name: 'TransportationOption',
  components: { Title, Tag, ChecklistElement },
  props: {
    option: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style>
.transport-card-option + .transport-card-option {
  margin-top: 24px;
}
</style>
