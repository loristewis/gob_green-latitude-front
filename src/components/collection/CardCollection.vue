<template>
  <Title>BaseCard</Title>

  <div class="background-container">
    <BaseCard>Test</BaseCard>
  </div>

  <div class="background-container">
    <BaseCard :accent="false"> Test </BaseCard>
  </div>

  <Title>TransportCard</Title>
  <div class="background-container">
    <TransportCard
      title="Chill-en-Île"
      tag-color="red"
      description="Partez à la mer sans investir dans de la crème solaire !"
    />
  </div>

  <Title>DestinationCard</Title>
  <div class="background-container">
    <DestinationCard
      title="Chill-en-Île"
      title-color="red"
      description="Partez à la mer sans investir dans de la crème solaire !"
    />
  </div>

  <div class="background-container">
    <DestinationCard
      title="Bigorneau-sur-mer"
      title-color="blue"
      description="Partez à la mer sans investir dans de la crème solaire !"
    />
  </div>

  <div class="background-container">
    <DestinationSwiper />
  </div>
</template>

<script>
import {
  Title,
  BaseCard,
  DestinationCard,
  DestinationSwiper,
  TransportCard,
} from '../lib'

export default {
  name: 'CardCollection',
  components: {
    DestinationCard,
    Title,
    BaseCard,
    DestinationSwiper,
    TransportCard,
  },
}
</script>

<style scoped>
div.background-container {
  display: inline-block;
  width: 350px;
  margin: 0 20px 20px 0;
  padding: 20px;
  background-color: var(--color-beige-light);
  overflow: hidden;
}
</style>
