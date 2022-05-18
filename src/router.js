import { createRouter, createWebHistory } from 'vue-router'
import Game from './views/Game.vue'
import Components from './views/Collection.vue'

const routes = [
  {
    path: '/',
    name: 'game',
    component: Game,
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
