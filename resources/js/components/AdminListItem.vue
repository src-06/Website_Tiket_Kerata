<script setup lang="ts">
  import { Card, CardContent } from "@/components/ui/card"
</script>

<template>
  <Card>
    <CardContent class="flex items-center gap-4 py-4">
      <div class="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-full">
        <slot name="icon" />
      </div>
      <div class="min-w-0 flex-1">
        <slot name="content" />
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <slot name="actions" />
      </div>
    </CardContent>
  </Card>
</template>
