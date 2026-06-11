<script setup lang="ts">
  import { Card, CardContent } from "@/components/ui/card"

  defineProps<{
    message: string
  }>()
</script>

<template>
  <Card>
    <CardContent class="py-12 text-center">
      <p class="text-muted-foreground">{{ message }}</p>
    </CardContent>
  </Card>
</template>
