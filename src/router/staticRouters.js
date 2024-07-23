export const staticRouters = [
  {
    path: '/',
    redirect: '/cadastro'
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/cadastro/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/calendar/index.vue')
  }
]
