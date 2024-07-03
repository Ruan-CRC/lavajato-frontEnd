import { createRouter, createWebHistory } from 'vue-router'
import { staticRouters } from './staticRouters.js'
import { useUserStore } from '@/stores/User.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRouters]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // Verifica se o usuário está autenticado
  if (userStore.token === '' && to.name === 'servicos') {
    
    next({ name: 'login' })
    throw new Error('Usuário não autenticado. Redirecionando para a página de login.')
  } else {
    // O usuário está autenticado ou está tentando acessar a página de login.
    next()
  }
})


export default router
