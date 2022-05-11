import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Components from './views/Collection.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
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
