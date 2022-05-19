<template>
  <BaseCard
    :title="title"
    :description="description"
    class="incident-card-container"
  >

    <Sticker
      :color-combo="{
        text: 'yellow',
        background: 'rose',
      }"
      class="sticker"
    >
      AAAAAAHH
    </Sticker>
  </BaseCard>
</template>

<script>
import { Title, BaseCard, Sticker } from '@/components/lib'

export default {
  name: 'IncidentCard',
  components: { BaseCard, Title, Sticker },
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
  margin-top: 128px;
  margin-bottom: 32px;

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
