<script setup lang="ts">
  import type { Component } from "vue"
  import { Link } from "@inertiajs/vue3"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { ArrowLeft } from "@lucide/vue"

  defineProps<{
    icon: Component
    title: string
    backUrl: string
    isEdit: boolean
  }>()

  defineEmits<{
    submit: []
  }>()
</script>

<template>
  <div class="mx-auto max-w-lg px-4 py-8">
    <Link
      :href="backUrl"
      class="text-muted-foreground hover:text-primary mb-4 inline-flex items-center gap-1 text-sm"
    >
      <ArrowLeft class="size-4" /> Kembali
    </Link>

    <Card>
      <CardHeader>
        <div class="flex items-center gap-2">
          <component
            :is="icon"
            class="size-5"
          />
          <CardTitle>{{ isEdit ? "Edit " + title : "Tambah " + title }}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form
          class="space-y-4"
          @submit.prevent="$emit('submit')"
        >
          <slot />
          <div class="flex justify-end gap-3">
            <Link :href="backUrl">
              <Button
                type="button"
                variant="outline"
                class="cursor-pointer"
                >Batal</Button
              >
            </Link>
            <Button
              type="submit"
              class="cursor-pointer"
            >
              {{ isEdit ? "Simpan Perubahan" : "Simpan" }}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
