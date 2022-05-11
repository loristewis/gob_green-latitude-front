<template>
  <h3>Score</h3>

  <p :class="score.wellness < 0 ? 'perdu' : ''">
    Bien-être : {{ score.wellness }}
  </p>

  <p :class="score.budget < 0 ? 'perdu' : ''">Budget : {{ score.budget }}</p>

  <p :class="score.pollution > 10 ? 'perdu' : ''">
    Pollution : {{ score.pollution }}
  </p>
</template>

<script>
export default {
  name: 'ScoreComponent',
  props: ['score'],
}
</script>

<style lang="scss" scoped>
.perdu {
  color: crimson;
}
</style>
