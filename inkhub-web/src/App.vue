<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { ref, onMounted } from 'vue'
import 'vue-sonner/style.css'

import {SERVER_URL} from "./config/config"


const isLoading = ref(false)
const isConnected = ref(false)

const checkConnection = async () => {
  isLoading.value = true;
  

  try {
    const res = await fetch(`${SERVER_URL}`)
    if (res.ok) {
      isConnected.value = true
    } else {
      isConnected.value = false
    }
  } catch (err) {
    isConnected.value = false
    console.error("出现了一些错误", err)
  } finally {
    isConnected.value = false
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
