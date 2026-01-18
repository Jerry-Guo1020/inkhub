<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns, type Payment } from '@/components/payments/columns' // 引入列定义
import DataTable from '@/components/payments/data-table.vue' // 引入表格组件

const data = ref<Payment[]>([])

// 模拟获取数据
async function getData(): Promise<Payment[]> {
  // 这里通常是你的 API 请求
  return [
    { id: '728ed52f', amount: 100, status: 'pending', email: 'm@example.com' },
    { id: '489e1d42', amount: 125, status: 'processing', email: 'example@gmail.com' },
    { id: '12345678', amount: 50, status: 'success', email: 'test@gmail.com' },
    { id: '87654321', amount: 200, status: 'failed', email: 'hello@world.com' },
    // 你可以多加几条数据测试分页效果
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="py-10">
    <h1 class="mb-5 text-2xl font-bold">Payments</h1>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>