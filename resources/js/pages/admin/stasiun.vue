<script setup lang="ts">
import { Link } from "@inertiajs/vue3"
import stasiunRoutes from "@/routes/stasiun"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2, MapPin } from "@lucide/vue"

defineProps<{
  stasiuns: {
    id_stasiun: number
    nama_stasiun: string
    kota: string
  }[]
}>()
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Daftar Stasiun</h1>
        <p class="text-muted-foreground text-sm">Kelola data stasiun kereta api</p>
      </div>
      <Link :href="stasiunRoutes.create.url()">
        <Button class="cursor-pointer">
          <Plus class="mr-2 size-4" /> Tambah Stasiun
        </Button>
      </Link>
    </div>

    <Card v-if="stasiuns.length === 0">
      <CardContent class="py-12 text-center">
        <p class="text-muted-foreground">Belum ada data stasiun</p>
      </CardContent>
    </Card>

    <div v-else class="space-y-3">
      <Card v-for="s in stasiuns" :key="s.id_stasiun">
        <CardContent class="flex items-center gap-4 py-4">
          <div class="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <MapPin class="size-5 text-primary" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-medium">{{ s.nama_stasiun }}</p>
            <p class="text-muted-foreground text-sm">{{ s.kota }}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <Link :href="stasiunRoutes.edit.url({ stasiun: s.id_stasiun })">
              <Button variant="outline" size="sm" class="cursor-pointer">
                <Pencil class="size-4" />
              </Button>
            </Link>
            <form @submit.prevent="$inertia.delete(stasiunRoutes.destroy.url({ stasiun: s.id_stasiun }))">
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
