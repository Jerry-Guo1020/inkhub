<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'

</script>

<template>
  <SidebarProvider>
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
