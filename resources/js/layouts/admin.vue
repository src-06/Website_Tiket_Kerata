<script setup lang="ts">
  import AdminSidebar from "@/components/AdminSidebar.vue"
  import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
  import { Toaster } from "@/components/ui/sonner"
</script>

<template>
  <Teleport to="body">
    <Toaster position="top-center" />
  </Teleport>
  <SidebarProvider>
    <AdminSidebar class="print:hidden" />
    <main class="w-full print:w-full">
      <div class="print:hidden">
        <SidebarTrigger class="mt-2 ml-2 cursor-pointer" />
      </div>
      <slot />
    </main>
  </SidebarProvider>
</template>
