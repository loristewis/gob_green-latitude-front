<template>
  <Title>Menu complet</Title>
  <Menu />

  <Title>Jauges</Title>
  <Gauge :value="10" from="left" :image="Smiley" />
  <Gauge :value="4" from="right" :image="Fire" />

  <Title>Bouton vers l'accueil</Title>
  <HomeButton />

  <Title>Budget</Title>
  <div class="demo-budget-container">
    <Budget class="demo-budget" :value="10"></Budget>
    <Budget class="demo-budget" :value="6"></Budget>
    <Budget class="demo-budget" :value="2"></Budget>
  </div>
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

<style lang="scss" scoped>
.demo-budget-container {
  background-color: var(--color-beige-cool);
  padding: 40px;
  display: flex;
  gap: 30px;
}
</style>
