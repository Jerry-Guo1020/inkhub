import { createRouter, createWebHistory } from 'vue-router'

import TodoListCard from '../views/todoList/todoListCard.vue'
import Home from '@/views/home/home.vue'
import Weather from '@/views/weather/index.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/todolist', component: TodoListCard},
  { path: '/weather', component: Weather},
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router