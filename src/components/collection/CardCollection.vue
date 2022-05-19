<template>
  <Title>BaseCard</Title>

  <div class="background-container">
    <BaseCard title="Titre de la card">Test</BaseCard>
  </div>

  <div class="background-container">
    <BaseCard title="Titre de la card" :accent="false"> Test </BaseCard>
  </div>

  <Title>Accommodation</Title>
  <div class="background-container">
    <AccommodationCardStack :elements="accommodations" />
  </div>

  <!--  <Title>Transport</Title>
  <div class="background-container">
    <TransportationCard
      title="Chill-en-Île"
      tag-color="red"
      description="Partez à la mer sans investir dans de la crème solaire !"
    />
  </div>-->

  <!--  <Title>Destination</Title>
  <div class="background-container">
    <DestinationCard
      title="Chill-en-Île"
      title-color="red"
      description="Partez à la mer sans investir dans de la crème solaire !"
      category="bof"
    />
  </div>

  <div class="background-container">
    <DestinationSwiper :destinations="destinations" />
  </div>-->
</template>

<script>
import { Title, BaseCard } from '@/components/lib'
import { getImage } from '@/helpers'

import DestinationCard from '../Game/Destination/DestinationCard.vue'
import DestinationSwiper from '../Game/Destination/DestinationSwiper.vue'
import TransportationCard from '../Game/Transportation/TransportationCard.vue'
import AccommodationCardStack from '../Game/Accommodation/AccommodationCardStack.vue'

import { destinations, accommodations } from './placeholderData'

export default {
  name: 'CardCollection',
  components: {
    DestinationCard,
    Title,
    BaseCard,
    DestinationSwiper,
    TransportationCard,
    AccommodationCardStack,
  },
  data() {
    return {
      destinations,
      accommodations,
      accommodation: accommodations[0],
      getImage,
    }
  },
}
</script>

<style scoped>
div.background-container {
  display: inline-block;
  width: 350px;
  margin: 0 20px 20px 0;
  padding: 20px;
  background-color: var(--color-beige-cool);
  overflow: hidden;
}
</style>
