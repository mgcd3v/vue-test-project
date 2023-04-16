import { createRouter, createWebHistory } from 'vue-router'
import UserListView from '../views/UserListView.vue'
import UserDetailView from '../views/UserDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserListView
    },
    {
      path: '/userlist',
      name: 'userlist',
      component: UserListView
    },
    {
      path: '/userdetail',
      name: 'userdetail',
      component: UserDetailView
    },
    {
      path: '/userdetail/:id',
      name: 'userdetailparam',
      component: UserDetailView
    }
  ]
})

export default router
