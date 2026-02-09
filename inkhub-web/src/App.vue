<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'

</script>

<template>
  <div v-if="isLoading" class="flex h-screen w-screen flex-col items-center justify-center gap-4">
    <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    <p class="text-sm font-medium  ">正在连接服务器...</p>
  </div>
  <div v-else-if="!isConnected" class="flex h-screen w-screen flex-col items-center justify-center gap-6">
    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-destructive"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    </div>
    <div class="text-center">
      <h3 class="text-lg font-semibold">连接失败</h3>
      <p class="text-sm ">无法连接到服务器，请检查后端服务是否已启动。</p>
    </div>
    <button 
      @click="checkConnection"
      class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
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

<style scoped>

</style>
