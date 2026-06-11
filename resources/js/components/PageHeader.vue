<script setup lang="ts">
  defineProps<{
    title: string
    description: string
  }>()
</script>

<template>
  <div class="mb-6 flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <p class="text-muted-foreground text-sm">{{ description }}</p>
    </div>
    <slot name="action" />
  </div>
</template>
