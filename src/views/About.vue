<template>
  <Container class="about-page">
    <Menu />
    <Sticker big class="about-page-title">Équipage</Sticker>
    <PresentationCard v-for="(member, i) in team" :key="i" :member="member" />
    <p class="about-page-credits">Projet réalisé à Gobelins<br />BDDI 2022</p>
  </Container>
</template>

<script>
import { team } from '@/constants'

import PresentationCard from '@/components/about/PresentationCard.vue'
import { Container, Sticker, Menu } from '@/components/lib'

export default {
  name: 'About',
  components: {
    PresentationCard,
    Container,
    Sticker,
    Menu,
  },
  data() {
    return {
      team,
    }
  },
}
</script>

<style lang="scss">
.about-page {
  &-title {
    position: absolute;
    top: 72px;
    left: 8px;
    transform: rotate(-3deg);
    z-index: 1;
  }

  &-credits {
    text-align: center;
    padding: 32px 0 32px 0;
    color: #aa9c89;
  }
}
</style>
