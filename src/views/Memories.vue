<template>
  <Container class="memories-container">
    <Menu />
    <BaseCard class="memories-card">
      <Sticker theme="rose-yellow" class="memories-title" big
        >Souvenirs</Sticker
      >
      <p class="memories-intro">
        Section en construction... Revenez plus tard !
      </p>
    </BaseCard>
  </Container>
</template>

<script>
import { Container, Menu, BaseCard, Sticker } from '@/components/lib'

export default {
  name: 'Memories',
  components: {
    Container,
    BaseCard,
    Sticker,
    Menu,
  },
}
</script>

<style lang="scss">
.memories-container {
  .memories-card {
    margin: 0 32px;
  }

  .memories-title {
    position: absolute;
    top: -16px;
    left: -16px;
    transform: rotate(-3deg);
  }
}
</style>
