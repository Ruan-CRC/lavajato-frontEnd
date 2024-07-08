import { createRouter, createWebHistory } from 'vue-router'
import { staticRouters } from './staticRouters.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRouters]
})

export default router
