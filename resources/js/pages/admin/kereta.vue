<script setup lang="ts">
import { Link } from "@inertiajs/vue3"
import keretaRoutes from "@/routes/kereta"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Train } from "@lucide/vue"

defineProps<{
  keretas: {
    id_kereta: number
    nama_kereta: string
    kelas: string
  }[]
}>()
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Daftar Kereta</h1>
        <p class="text-muted-foreground text-sm">Kelola data kereta api</p>
      </div>
      <Link :href="keretaRoutes.create.url()">
        <Button class="cursor-pointer">
          <Plus class="mr-2 size-4" /> Tambah Kereta
        </Button>
      </Link>
    </div>

    <Card v-if="keretas.length === 0">
      <CardContent class="py-12 text-center">
        <p class="text-muted-foreground">Belum ada data kereta</p>
      </CardContent>
    </Card>

    <div v-else class="space-y-3">
      <Card v-for="k in keretas" :key="k.id_kereta">
        <CardContent class="flex items-center gap-4 py-4">
          <div class="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <Train class="size-5 text-primary" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-medium">{{ k.nama_kereta }}</p>
            <Badge variant="secondary" class="mt-1">{{ k.kelas }}</Badge>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <Link :href="keretaRoutes.edit.url({ kereta: k.id_kereta })">
              <Button variant="outline" size="sm" class="cursor-pointer">
                <Pencil class="size-4" />
              </Button>
            </Link>
            <form @submit.prevent="$inertia.delete(keretaRoutes.destroy.url({ kereta: k.id_kereta }))">
              <Button variant="destructive" size="sm" class="cursor-pointer" type="submit">
                <Trash2 class="size-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
