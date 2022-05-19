<template>
  <p>{{ activity.title }}</p>
  <p>{{ activity.description }}</p>
  <p v-if="activity.thoughts">({{ activity.thoughts }})</p>
  <p>
    <span>{{ activity.wishes.data.map((el) => activity.title) }}</span>
    <span style="opacity: 0.4"
      >(bien-être : {{ activity.wellness ? activity.wellness : '?' }} / budget :
      {{ activity.budget }} / pollution : {{ activity.pollution }})</span
    >
  </p>
</template>

<script>
export default {
  name: 'ActivityCard',
  props: ['activity'],
}
</script>

<style></style>
