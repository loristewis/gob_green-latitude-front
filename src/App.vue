<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-in-out">
      <component class="slide-in-out" :is="Component" />
    </transition>
  </router-view>
</template>

<style>
@import './styles/base.scss';
@import './styles/_animations.scss';
@import './styles/_variables.scss';
@import './styles/_mixins.scss';
@import './assets/fonts/fonts.scss';

#app {
  font-weight: normal;
  height: 100%;
  background-color: var(--color-beige-cool);
}
</style>
