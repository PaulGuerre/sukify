import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '@/views/HomeView.vue'
import MusicsView from '@/views/MusicsView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
    redirect: '/musics'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/musics',
    name: 'musics',
    component: MusicsView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/musics'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
