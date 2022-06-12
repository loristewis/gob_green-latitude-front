<template>
  <Container class="memories-container">
    <Menu />

    <CardContainer class="memories-card">
      <Sticker theme="rose-yellow" class="memories-title" big>
        Souvenirs
      </Sticker>

      <p class="memories-intro">
        Section en construction... Revenez plus tard !
      </p>
    </CardContainer>
  </Container>
</template>

<script>
import { Container, Menu, CardContainer, Sticker } from '@/components/lib'

export default {
  name: 'Memories',
  components: {
    Container,
    Menu,
    CardContainer,
    Sticker,
  },
}
</script>

<style lang="scss">
.memories-container {
  .memories-card {
    margin: 0 32px;
    padding: 48px 32px 32px;
  }

  .memories-title {
    position: absolute;
    top: -16px;
    left: -16px;
    transform: rotate(-3deg);
  }
}
</style>
