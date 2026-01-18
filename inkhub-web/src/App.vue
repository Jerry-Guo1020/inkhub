<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'


</script>

<template>
 <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
      <slot />
    </main>
    <router-view></router-view>
  </SidebarProvider>

</template>

<style scoped>

</style>
