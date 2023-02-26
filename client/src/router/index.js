import { createRouter, createWebHistory } from 'vue-router'
import MusicsView from '@/views/MusicsView.vue'
import PlaylistsView from '@/views/PlaylistsView.vue'
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
    path: '/playlists',
    name: 'playlists',
    component: PlaylistsView
  },
  {
    path: '/playlists/:id/musics',
    name: 'playlist-musics',
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
