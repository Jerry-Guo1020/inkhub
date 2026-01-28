<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppSidebar from '@/components/AppSidebar/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import { SERVER_URL } from "./config/config"

const isConnected = ref(false)
const isLoading = ref(true)
const TIMEOUT = 5000

const checkConnection = async () => {
  isLoading.value = true
  isConnected.value = false 
  
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, TIMEOUT)

  try {
    // 尝试连接后端根路径
    // 注意：fetch 请求可能会因为网络错误抛出异常，所以需要 try-catch
    const response = await fetch(`${SERVER_URL}`, { signal: controller.signal })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      isConnected.value = true
    } else {
      isConnected.value = false
    }
  } catch (error: any) {
    isConnected.value = false
    if (error.name === 'AbortError') {
      console.error('连接超时')
    } else {
      console.error("出现了一些错误", error)
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  checkConnection()
})

</script>

<template>
  <div v-if="isLoading" class="">
    正在连接服务器……
  </div>
  <div v-else-if="!isConnected">
    失败了
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

<style scoped>

</style>
