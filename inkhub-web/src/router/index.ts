import { createRouter, createWebHistory } from 'vue-router'

import TodoListCard from '../views/todoList/todoListCard.vue'
import Home from '@/views/home/home.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/todolist', component: TodoListCard},
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router