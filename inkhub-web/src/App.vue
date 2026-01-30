<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppSidebar from '@/components/AppSidebar/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import { SERVER_URL } from "./config/config"
import ky from 'ky'

const isConnected = ref(false)
const isLoading = ref(true)
const TIMEOUT = 5000

const checkConnection = async() => {
  isLoading.value = true
  isConnected.value = false
  try {
    await ky.get(SERVER_URL,{
      timeout: TIMEOUT,
      retry: 0
    })
    isConnected.value = true
  } catch(err) {
    console.log("出错",err)
    isConnected.value = false
  } finally {
    isLoading.value = false
  }
}




// 之前的 fetch-try 代码备份
// const checkConnection = async () => {
//   isLoading.value = true
//   isConnected.value = false
//   const controller = new AbortController()
//   const timeoutId = setTimeout(() => {
//     controller.abort()
//   }, TIMEOUT)

//   try {
//     // 尝试连接后端根路径
//     // 注意：fetch 请求可能会因为网络错误抛出异常，所以需要 try-catch
//     const response = await fetch(`${SERVER_URL}`, { signal: controller.signal })

//     clearTimeout(timeoutId)

//     if (response.ok) {
//       isConnected.value = true
//     } else {
//       isConnected.value = false
//     }
//   } catch (error: any) {
//     isConnected.value = false
//     if (error.name === 'AbortError') {
//       console.error('连接超时')
//     } else {
//       console.error("出现了一些错误", error)
//     }
//   } finally {
//     isLoading.value = false
//   }
// }

onMounted(() => {
  checkConnection()
})

</script>

<template>
  <div v-if="isLoading" class="flex h-screen w-screen flex-col items-center justify-center gap-4">
    <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    <p class="text-sm font-medium  ">正在连接服务器...</p>
  </div>
  <div v-else-if="!isConnected" class="flex h-screen w-screen flex-col items-center justify-center gap-6">
    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-destructive">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    </div>
    <div class="text-center">
      <h3 class="text-lg font-semibold">连接失败</h3>
      <p class="text-sm ">无法连接到服务器，请检查后端服务是否已启动。</p>
    </div>
    <button @click="checkConnection"
      class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
      重试连接
    </button>
  </div>
  <SidebarProvider v-else>
    <AppSidebar />
    <main class="w-full p-6">
      <SidebarTrigger />
      <router-view></router-view>
    </main>
  </SidebarProvider>
  <Toaster richColors />
</template>

<style scoped></style>
