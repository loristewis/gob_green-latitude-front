<template>
  <router-view v-slot="{ Component }">
    <DesktopContainer>
      <component :is="Component" />
    </DesktopContainer>
  </router-view>
</template>

<script setup>
import DesktopContainer from '@/components/DesktopContainer.vue'
</script>

<style>
@import './styles/base.scss';
@import './styles/_animations.scss';
@import './styles/_variables.scss';
@import './styles/_mixins.scss';
@import './assets/fonts/fonts.scss';

#app {
  position: absolute;
  font-weight: normal;
  height: 100%;
  width: 100%;
}
</style>
