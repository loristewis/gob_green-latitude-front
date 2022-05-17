<script>
export default {
  name: 'IncidentChoice',
  props: {
    choice: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    console.log(props)
  },
}
</script>

<template>
  <p @click="$emit('select')">{{ choice.title }}</p>
</template>

<style></style>
