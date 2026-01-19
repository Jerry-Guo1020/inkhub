<script setup lang="ts">
import { columns, type Task } from '@/components/tasks/columns' // 引入列定义
import DataTable from '@/components/tasks/data-table.vue' // 引入表格组件

defineProps<{
  data: Task[]
}>()

defineEmits(['update:data'])
</script>

<template>
  <div class="py-10">
    <h1 class="mb-5 text-2xl font-bold">待办事项</h1>
    <DataTable :columns="columns" :data="data" @update:data="$emit('update:data', $event)" />
  </div>
</template>