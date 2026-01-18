import { createRouter, createWebHistory } from 'vue-router'

import TodoListCard from '../views/todoList/todoListCard.vue'

const routes = [
  { path: '/', component: TodoListCard},
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router