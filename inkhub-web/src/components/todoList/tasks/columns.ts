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
        // status.toUpperCase()这个是直接让todo和done全大写
        status === 'todo' ? "待办" : "已完成"    // 这样就成功改了变成中文自定义
      )
    },
  },
  // 3. 操作列（直接按钮）
  {
    id: 'actions',
    header: '操作',
    cell: ({ row, table }) => {
      const task = row.original
      const meta = table.options.meta as any

      return h('div', { class: 'flex gap-2 justify-center' }, [
        h(Button, { variant: 'outline', size: 'sm', 
          onClick: () => {
            meta.deleteTask(task.id)
            toast.success('删除成功！', {
            description: `成功删除此内容`,
            position: 'bottom-right',
        })}}, '删除'),
        h(Button, { variant: 'default', size: 'sm', onClick: () => {
            const newStatus = task.status === 'todo' ? 'done' : 'todo'
            meta.updateStatus(task.id, newStatus)
            toast.success('操作成功！', {
            description: `已成功更新任务状态！`,
            position: 'bottom-right',
        }) }}, task.status === 'todo' ? '已完成' : '撤销完成')
      ])
    },
  },
]