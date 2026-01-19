import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'

// 定义数据类型
export interface Task {
  id: string
  task: string
  status: 'todo' | 'done'
}

export const columns: ColumnDef<Task>[] = [
  // 1. 任务内容列
  {
    accessorKey: 'task',
    header: '记录的内容',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('task')),
  },
  // 2. 状态列（带边框颜色）
  {
    accessorKey: 'status',
    header: '当前状态',
    cell: ({ row }) => {
      const status = row.getValue('status') as 'todo' | 'done'
      const colorClass = status === 'todo' ? 'border-red-400  text-white bg-red-400' : 'border-green-400 text-white bg-green-400'
      return h(
        'div',
        { class: ` inline-block px-3 py-1 border-2 rounded-md  ${colorClass}` },
        status.toUpperCase()
      )
    },
  },
  // 3. 操作列（直接按钮）
  {
    id: 'actions',
    header: '操作',
    cell: ({ row }) => {
      const task = row.original
      return h('div', { class: 'flex gap-2 justify-center' }, [
        h(Button, { variant: 'outline', size: 'sm', 
          onClick: () => 
            toast.success('删除成功！', {
            description: `成功删除此内容`,
            position: 'bottom-right',
        })}, '删除'),
        h(Button, { variant: 'default', size: 'sm', onClick: () =>  
            toast.success('成功执行该操作！', {
            description: `已成功将此内容放入done行列！`,
            position: 'bottom-right',
        }) }, '已完成')
      ])
    },
  },
]