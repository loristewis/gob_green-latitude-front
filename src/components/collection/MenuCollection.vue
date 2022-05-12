<template>
  <Title>Menu complet</Title>
  <Menu />

  <Title>Jauges</Title>
  <Gauge :progress="100" from="left" :image="Smiley" />
  <Gauge :progress="40" from="right" :image="Fire" />

  <Title>Bouton vers l'accueil</Title>
  <HomeButton />

  <Title>Budget</Title>
  <Budget>13</Budget>
</template>

<script>
import { Title, Menu } from '../lib'

import Gauge from '../lib/menu/Gauge.vue'
import HomeButton from '../lib/menu/HomeButton.vue'
import Budget from '../lib/menu/Budget.vue'

import Smiley from '../../assets/smiley.svg'
import Fire from '../../assets/fire.svg'

export default {
  name: 'MenuCollection',
  components: { Title, Menu, Gauge, HomeButton, Budget },
  data() {
    return {
      Smiley,
      Fire,
    }
  },
}
</script>
