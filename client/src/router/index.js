import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '@/views/HomeView.vue'
import MusicView from '@/views/MusicView.vue'
import PlaylistsView from '@/views/PlaylistsView.vue'
import PlaylistView from '@/views/PlaylistView.vue'
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
    component: MusicView
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: PlaylistsView
  },
  {
    path: '/playlists/:id',
    name: 'playlists',
    component: PlaylistView
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
