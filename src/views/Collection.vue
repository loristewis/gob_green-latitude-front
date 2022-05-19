<template>
  <div class="collection-container">
    <router-link to="/">&lt; Retour au jeu</router-link>

    <Title tag="h1">Collection des composants</Title>

    <div class="nav-collection">
      <div v-for="item in componentsList">
        <router-link
          :to="{ name: 'collection-component', params: { id: item.id } }"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>

    <div class="component-container">
      <component v-if="currentComponent" :is="currentComponent" />
    </div>
  </div>
</template>

<script>
import { Title } from '@/components/lib'

import TextsCollection from '../components/collection/TextsCollection.vue'
import ScoresCollection from './../components/collection/ScoresCollection.vue'
import ThoughtCollection from '../components/collection/ThoughtCollection.vue'
import TagCollection from '../components/collection/TagCollection.vue'
import ButtonCollection from '../components/collection/ButtonCollection.vue'
import CardCollection from '../components/collection/CardCollection.vue'
import OthersCollection from '../components/collection/OthersCollection.vue'

export default {
  name: 'Collection',
  components: {
    Title,
    TextsCollection,
    ScoresCollection,
    ThoughtCollection,
    TagCollection,
    ButtonCollection,
    CardCollection,
    OthersCollection,
  },
  data() {
    return {
      componentsList: [
        {
          id: 'texts',
          title: 'Textes',
          component: TextsCollection,
        },
        {
          id: 'scores',
          title: 'Menu / scores',
          component: ScoresCollection,
        },
        {
          id: 'thought',
          title: 'Pensées',
          component: ThoughtCollection,
        },
        {
          id: 'tag',
          title: 'Tags',
          component: TagCollection,
        },
        {
          id: 'button',
          title: 'Boutons',
          component: ButtonCollection,
        },
        {
          id: 'card',
          title: 'Cards',
          component: CardCollection,
        },
        {
          id: 'others',
          title: 'Divers',
          component: OthersCollection,
        },
      ],
    }
  },
  computed: {
    currentComponent() {
      const target = this.componentsList.find(
        (item) => item.id === this.$route.params.id
      )

      if (!target) {
        console.log('Composant non déclaré')
        return
      }

      if (!target.component) {
        console.log('Erreur composant')
        return
      }

      console.log(target.component.name)
      return target.component.name
    },
  },
}
</script>

<style scoped>
.nav-collection {
  display: flex;
  column-gap: 8px;
}
</style>

<style lang="scss">
.collection-container {
  padding: 24px 32px;

  .component-container {
    & > h1 {
      margin: 24px auto 8px;
    }

    & > h1:not(:first-of-type) {
      margin-top: 48px;
      padding-top: 16px;
      border-top: 1px solid black;
    }
  }
}
</style>
