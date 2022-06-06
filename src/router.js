import { createRouter, createWebHistory } from 'vue-router'

import TitleScreen from './views/TitleScreen.vue'
import Game from './views/Game.vue'
import About from './views/About.vue'
import Memories from './views/Memories.vue'
import Components from './views/Collection.vue'

const routes = [
  {
    path: '/',
    name: 'title',
    component: TitleScreen,
  },
  {
    path: '/game',
    name: 'game',
    component: Game,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/memories',
    name: 'memories',
    component: Memories,
  },
  {
    path: '/collection',
    name: 'collection',
    component: Components,
  },
  {
    path: '/collection/:id',
    name: 'collection-component',
    component: Components,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
