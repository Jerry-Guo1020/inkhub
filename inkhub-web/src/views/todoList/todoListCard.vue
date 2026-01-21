<template>
    <div class="container">
        <h1 class="text-2xl  mb-5">To-Do List 控制台</h1>
        <div class="mb-5">你可以在这里编辑你的备忘录，然后一键传到水墨屏中</div>
        <div ref="canvas" class="canvas">
            <h1 class="main-title">To-Do List</h1>

            <div class="column-container">
                <div class="column-card">
                    <div class="column-header">To Do</div>
                    <div class="task-list">
                        <div v-for="(task, taskIndex) in tasks.filter(t => t.status === 'todo')" :key="task.id" class="task-item">
                            <span class="task-num">{{ taskIndex + 1 }} .</span>
                            {{ task.task }}
                        </div>
                    </div>
                </div>

                <div class="column-card">
                    <div class="column-header">Done</div>
                    <div class="task-list">
                        <div v-for="(task, taskIndex) in tasks.filter(t => t.status === 'done')" :key="task.id" class="task-item-done">
                            <span class="task-num">{{ taskIndex + 1 }} .</span>
                            {{ task.task }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="controls">
            <button class="btn-add" @click="handleAddTask">
                添加新任务
            </button>
            <button class="btn-export" @click="handleExportImage" :disabled="isGenerating">
                {{ isGenerating ? '生成中...' : '一键传入水墨屏' }}
            </button>
        </div>

        <!-- 添加任务弹窗 -->
        <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <AddListCard @add-task="addTask" @close="closeModal" />
            </div>
        </div>

    </div>
    <div>
        <AllDataTable v-model:data="tasks" />
    </div>
</template>

<script setup>
import AddListCard from '@/components/todoList/addListCard/addListCard.vue'
import html2canvas from 'html2canvas'
import { toast } from 'vue-sonner'
import { reactive, ref } from 'vue';
import AllDataTable from '@/components/todoList/dataTable/allDataTable.vue';

// 状态管理
const isGenerating = ref(false);
const isModalOpen = ref(false); // 控制弹窗显示

// 使用ref来绑定 document.getElementById()
const canvas = ref(null)

// 统一的任务列表
const tasks = ref([
    { id: '1', task: '完成项目报告', status: 'todo' },
    { id: '2', task: '准备周会演示', status: 'todo' },
    { id: '3', task: '回复客户邮件', status: 'done' },
    { id: '4', task: '修复 Bug #123', status: 'done' },
])

// 实行导出为照片的任务

// 1、添加任务按钮
const handleAddTask = () => {
    isModalOpen.value = true;
};

const addTask = (taskData) => {
    tasks.value.push({ id: String(Date.now()), task: taskData.title, status: 'todo' });
    isModalOpen.value = false;
};

const closeModal = () => {
    isModalOpen.value = false;
};

// 2、导出为照片按钮
const handleExportImage = async () => {
    const element = canvas.value
    if (!element) {
        alert("未找到dom元素")
        return
    }

    isGenerating.value = true

    try {
        const canva = await html2canvas(element, {
            scale: 2, // 提高清晰度
            backgroundColor: "#E6E3D8", // 确保背景色
            useCORS: true
        });

        const imgData = canva.toDataURL('image/png')
        const link = document.createElement("a")
        link.download = "todoList.png"
        link.href = imgData;
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('图片导出添加成功！', {
            description: `已导出图片: todoList.png`,
            position: 'bottom-right',
        })
    } catch (error) {
        console.error("生成失败:", error);
        toast.error('图片导出失败！', {
            description: error,
            position: 'bottom-right',
        })
    } finally {
        isGenerating.value = false;
    }

}

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.canvas {
    width: 800px;
    background-color: #E6E3D8;
    padding: 40px 50px;
    box-sizing: border-box;
    color: #333;
    border-radius: 4px;
}

.main-title {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 30px;
    color: #222;
}

.column-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;

}

.column-card {
    flex: 1;
    border: 1px solid #888;
    border-radius: 12px;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    min-height: 400px;
}

.column-header {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    padding: 15px 15px 5px 15px;
    margin-bottom: 5px;
}

.task-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.task-item {
    padding: 12px 15px;
    border-top: 1px solid #999;
    font-size: 15px;
    line-height: 1.4;
    color: #444;
    display: flex;
}

.task-item-done {
    padding: 12px 15px;
    border-top: 1px solid #999;
    font-size: 15px;
    line-height: 1.4;
    color: #444;
    display: flex;
}

.task-num {
    margin-right: 8px;
    font-weight: 500;
}

.controls {
    margin-top: 20px;
    display: flex;
    gap: 15px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: opacity 0.2s;
}

.btn-add {
    background-color: #4CAF50;
    color: white;
}

.btn-export {
    background-color: #2196F3;
    color: white;
}

button:hover {
    opacity: 0.9;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* 弹窗样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
}

.modal-content {
    border-radius: 12px;
    position: relative;
    min-width: 500px;
    max-width: 600px;
    width: 90vw;
    max-height: 80vh;
    overflow-y: auto;
    padding: 20px;
}

.close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: #666;
    z-index: 1;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.close-button:hover {
    color: #333;
    background-color: rgba(0, 0, 0, 0.1);
}
</style>