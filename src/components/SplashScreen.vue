<script>
// ici importer l'asset selon nomenclature

export default {
  name: 'SplashScreen',
  props: ['tagline'],
}
</script>

<template>
  <h3>Splash screen</h3>
  <p>{{ tagline }}</p>
</template>

<style></style>
