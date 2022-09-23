import { createRouter, createMemoryHistory } from 'vue-router'
import pages from '../pages'
import { getStorage } from '../utils'

const routes = [
  {
    path: '/',
    redirect: { name: 'todolist' }
  },
  ...pages
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = getStorage('token') || ''
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
