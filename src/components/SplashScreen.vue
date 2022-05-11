<script>
export default {
  name: 'SplashScreen',
  props: ['infos'],
}
</script>

<template>
  <h3>Splash screen</h3>
  <p>{{ infos.tagline }}</p>
  <img :src="infos.image" />
</template>

<style></style>
