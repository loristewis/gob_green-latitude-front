<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/collection">Collection des composants</router-link>
  </div>

  <router-view />
</template>

<style>
@import './assets/base.scss';
@import './assets/fonts/fonts.scss';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

@media (min-width: 640px) {
}
</style>
