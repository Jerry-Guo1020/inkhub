<script setup lang="ts">
import { columns, type Task } from '@/components/tasks/columns' // 引入列定义
import TodoTable from '@/components/tasks/todo/todoTable.vue' // 引入 Todo 表格组件
import DoneTable from '@/components/tasks/done/doneTable.vue' // 引入 Done 表格组件
import { computed } from 'vue'

const props = defineProps<{
  data: Task[]
}>()

const emit = defineEmits(['update:data'])

// 计算属性：分离 Todo 和 Done 数据
const todoData = computed({
  get: () => props.data.filter(t => t.status === 'todo'),
  set: (newVal) => {
    // 当 Todo 列表更新时（排序或状态改变），合并回总数据
    // 注意：这里我们简单地将 Todo 放在 Done 前面，或者保留 Done 的原样
    // 为了保持 Done 列表的顺序不变，我们需要获取当前的 Done 列表
    const currentDone = props.data.filter(t => t.status === 'done')
    emit('update:data', [...newVal, ...currentDone])
  }
})

const doneData = computed({
  get: () => props.data.filter(t => t.status === 'done'),
  set: (newVal) => {
    // 当 Done 列表更新时
    const currentTodo = props.data.filter(t => t.status === 'todo')
    emit('update:data', [...currentTodo, ...newVal])
  }
})
</script>

<template>
  <div class="py-10 space-y-10">
    <!-- Todo 部分 -->
    <div>
      <h2 class="mb-4 text-xl font-bold text-red-500">待办事项 (To Do)</h2>
      <TodoTable :columns="columns" v-model:data="todoData" />
    </div>

    <!-- Done 部分 -->
    <div>
      <h2 class="mb-4 text-xl font-bold text-green-500">已完成 (Done)</h2>
      <DoneTable :columns="columns" v-model:data="doneData" />
    </div>
  </div>
</template>