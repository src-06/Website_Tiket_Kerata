<script setup lang="ts">
  import { Toaster } from "@/components/ui/sonner"
</script>

<template>
  <Teleport to="body">
    <Toaster position="top-center" />
  </Teleport>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
    <slot />
  </div>
</template>
