<template>
  <CardContainer class="incident-card-container">
    <Title tag="h2" class="name">
      {{ title }}
    </Title>

    <p>
      {{ description }}
    </p>

    <div class="star">STAR</div>

    <Sticker
      :color-combo="{
        text: 'yellow',
        background: 'rose',
      }"
      class="sticker"
    >
      AAAAAAHH
    </Sticker>
  </CardContainer>
</template>

<script>
import { Title, CardContainer, Sticker } from '@/components/lib'

export default {
  name: 'IncidentCard',
  components: { Title, CardContainer, Sticker },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.incident-card-container {
  padding: 32px;
  margin-top: 128px;
  margin-bottom: 32px;

  .name {
    margin-bottom: 8px;
  }

  .sticker {
    position: absolute;
    top: -24px;
    left: 24px;
  }

  .star {
    position: absolute;
    top: -104px;
    right: 48px;

    // à remplacer par l'étoile et supprimer les 3 lignes ci-dessous
    height: 104px;
    width: 120px;
    background-color: var(--color-yellow);
  }
}
</style>
