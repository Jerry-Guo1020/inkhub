<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns, type Task } from '@/components/payments/columns' // 引入列定义
import DataTable from '@/components/payments/data-table.vue' // 引入表格组件

const data = ref<Task[]>([])

// 模拟获取数据
async function getData(): Promise<Task[]> {
  // 这里通常是你的 API 请求
  return [
    { id: '1', task: '完成项目报告', status: 'todo' },
    { id: '2', task: '准备周会演示', status: 'todo' },
    { id: '3', task: '回复客户邮件', status: 'done' },
    { id: '4', task: '修复 Bug #123', status: 'done' },
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="py-10">
    <h1 class="mb-5 text-2xl font-bold">待办事项</h1>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>