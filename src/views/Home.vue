<template>
  <Title tag="h1">Green Latitude</Title>

  <MainContainer></MainContainer>
</template>

<script>
import MainContainer from './../components/MainContainer.vue'
import { Title } from './../components/lib'

export default {
  name: 'HomeScreen',
  components: {
    MainContainer,
    Title,
  },
}
</script>
