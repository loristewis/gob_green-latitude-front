<template>
  <h3>Splash screen</h3>
  <p>{{ infos.tagline }}</p>
  <img :src="infos.image" />
</template>

<script>
export default {
  name: 'SplashScreen',
  props: ['infos'],
}
</script>

<style></style>
