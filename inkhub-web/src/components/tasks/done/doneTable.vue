<script setup lang="ts" generic="TData, TValue">
import { ref, computed } from 'vue'
import type { 
  ColumnDef, 
  SortingState, 
  ColumnFiltersState, 
  VisibilityState 
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select'

import { ChevronDown } from 'lucide-vue-next'
import { valueUpdater } from '@/lib/utils'
import { VueDraggableNext } from 'vue-draggable-next'


// 引入 UI 组件
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// 接收父组件传来的数据
const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const emit = defineEmits(['update:data'])

const draggableData = computed({
  get: () => props.data,
  set: (value) => {
    emit('update:data', value)
  },
})

// 状态管理
const sorting = ref<SortingState>([]) // 排序状态
const columnFilters = ref<ColumnFiltersState>([]) // 过滤状态
const columnVisibility = ref<VisibilityState>({}) // 列显隐状态
const rowSelection = ref({}) // 行选择状态

// 初始化表格实例
const table = useVueTable({
  get data() { return draggableData.value || [] },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(), // 分页逻辑
  getSortedRowModel: getSortedRowModel(), // 排序逻辑
  getFilteredRowModel: getFilteredRowModel(), // 过滤逻辑
  
  // 绑定状态更新函数
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  
  // 暴露状态给表格内部使用
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
  getRowId: (row: any) => row.id,
  meta: {
    deleteTask: (id: string) => {
      draggableData.value = draggableData.value.filter((t: any) => t.id !== id)
    },
    updateStatus: (id: string, status: 'todo' | 'done') => {
      draggableData.value = draggableData.value.map((t: any) => 
        t.id === id ? { ...t, status } : t
      )
    }
  }
})

const rowMap = computed(() => {
  const map = new Map()
  table.getRowModel().rows.forEach(row => {
    map.set((row.original as any).id, row)
  })
  return map
})
</script>

<template>
  <div class="w-full">
    <div class="flex items-center py-4">
      <Input 
        class="max-w-sm" 
        placeholder="请输入您需要搜索的内容"
        :model-value="table.getColumn('task')?.getFilterValue() as string"
        @update:model-value="table.getColumn('task')?.setFilterValue($event)" 
      />
      
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            更多 <ChevronDown class="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize "
            :modelValue="column.getIsVisible()"
            @update:modelValue="(value) => column.toggleVisibility(!!value)"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div class="border rounded-md text-center">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            
            <TableHead v-for="header in headerGroup.headers" :key="header.id" class="text-center">
              <FlexRender 
                v-if="!header.isPlaceholder" 
                :render="header.column.columnDef.header"
                :props="header.getContext()" 
              />
              
            </TableHead>
            
          </TableRow>
          
        </TableHeader>
        <VueDraggableNext
          v-model="draggableData"
          tag="tbody"
        >
        
          <TableRow
            v-for="task in draggableData"
            :key="(task as any).id"
            class="cursor-move"
            :data-state="rowMap.get((task as any).id)?.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in rowMap.get((task as any).id)?.getVisibleCells()" :key="cell.id" class="text-center">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </VueDraggableNext>
        <TableBody v-if="!table.getRowModel().rows?.length">
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end py-4 space-x-2">
      <div class="flex-1 text-sm text-muted-foreground">
        已选择内容：
        {{ table.getFilteredSelectedRowModel().rows.length }} /
        {{ table.getFilteredRowModel().rows.length }} 
      </div>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        上一页
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        下一页
      </Button>
    </div>
  </div>
</template>