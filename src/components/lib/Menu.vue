<template>
  <Gauge :progress="100" from="left" :image="Smiley" />
  <Gauge :progress="40" from="right" :image="Fire" />

  <HomeButton />

  <Budget />
</template>

<script>
import HomeButton from './menu/HomeButton.vue'
import Budget from './menu/Budget.vue'
import Gauge from './menu/Gauge.vue'
import Smiley from '../../assets/smiley.svg'
import Fire from '../../assets/fire.svg'

export default {
  name: 'Menu',
  components: {
    HomeButton,
    Budget,
    Gauge,
  },
  data() {
    return {
      Smiley,
      Fire,
    }
  },
}
</script>

<style scoped></style>
