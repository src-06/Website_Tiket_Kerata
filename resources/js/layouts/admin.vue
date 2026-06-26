<script setup lang="ts">
  import AdminSidebar from "@/components/AdminSidebar.vue"
  import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
  import { Toaster } from "@/components/ui/sonner"
  import { Button } from "@/components/ui/button"
  import { Home } from "@lucide/vue"
  import { Link } from "@inertiajs/vue3"
</script>

<template>
  <Teleport to="body">
    <Toaster position="top-center" />
  </Teleport>
  <SidebarProvider>
    <AdminSidebar class="print:hidden" />
    <main class="w-full print:w-full">
      <div class="flex items-center gap-2 print:hidden">
        <SidebarTrigger class="mt-2 ml-2 cursor-pointer" />
        <Button
          as-child
          variant="ghost"
          size="sm"
          class="ml-2 cursor-pointer"
        >
          <Link href="/">
            <Home class="mr-1 size-4" />
            Beranda
          </Link>
        </Button>
      </div>
      <slot />
    </main>
  </SidebarProvider>
</template>
