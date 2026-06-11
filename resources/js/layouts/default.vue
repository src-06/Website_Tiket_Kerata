<script setup lang="ts">
  import AppSidebar from "@/components/AppSidebar.vue"
  import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
  import { useTheme } from "@/composables/useTheme"
  import { Moon, Sun } from "@lucide/vue"
  import { Button } from "@/components/ui/button"

  const { isDark, toggle } = useTheme()
</script>

<template>
  <SidebarProvider>
    <AppSidebar class="print:hidden" />
    <main class="w-full print:w-full">
      <div class="flex items-center gap-2 print:hidden">
        <SidebarTrigger class="ml-2 mt-2" />
        <Button variant="ghost" size="icon" class="ml-auto mr-2 mt-2 cursor-pointer" @click="toggle">
          <Sun v-if="isDark" class="size-4" />
          <Moon v-else class="size-4" />
        </Button>
      </div>
      <slot />
    </main>
  </SidebarProvider>
</template>
