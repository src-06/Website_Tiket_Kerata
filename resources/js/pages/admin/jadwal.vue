<script setup lang="ts">
import { Link } from "@inertiajs/vue3"
import jadwalRoutes from "@/routes/jadwal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Train, Clock, MapPin } from "@lucide/vue"

const props = defineProps<{
  jadwals: {
    id_jadwal: number
    kereta: { nama_kereta: string; kelas: string }
    stasiun_asal: { nama_stasiun: string; kota: string }
    stasiun_tujuan: { nama_stasiun: string; kota: string }
    waktu_berangkat: string
    waktu_tiba: string
    harga: number
  }[]
}>()

function formatHarga(amount: number) {
  return "Rp " + amount.toLocaleString("id-ID")
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Daftar Jadwal</h1>
        <p class="text-muted-foreground text-sm">Kelola jadwal keberangkatan kereta</p>
      </div>
      <Link :href="jadwalRoutes.create.url()">
        <Button class="cursor-pointer">
          <Plus class="mr-2 size-4" /> Tambah Jadwal
        </Button>
      </Link>
    </div>

    <Card v-if="jadwals.length === 0">
      <CardContent class="py-12 text-center">
        <p class="text-muted-foreground">Belum ada jadwal</p>
      </CardContent>
    </Card>

    <div v-else class="space-y-3">
      <Card v-for="j in jadwals" :key="j.id_jadwal">
        <CardContent class="flex items-center gap-4 py-4">
          <div class="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <Train class="size-5 text-primary" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium">{{ j.kereta.nama_kereta }}</span>
              <Badge variant="secondary">{{ j.kereta.kelas }}</Badge>
            </div>
            <div class="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span class="flex items-center gap-1"><MapPin class="size-3" /> {{ j.stasiun_asal.nama_stasiun }} &rarr; {{ j.stasiun_tujuan.nama_stasiun }}</span>
              <span class="flex items-center gap-1"><Clock class="size-3" /> {{ formatDate(j.waktu_berangkat) }}</span>
              <span>{{ formatTime(j.waktu_berangkat) }} - {{ formatTime(j.waktu_tiba) }}</span>
              <span class="font-medium text-primary">{{ formatHarga(j.harga) }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <Link :href="jadwalRoutes.edit.url({ jadwal: j.id_jadwal })">
              <Button variant="outline" size="sm" class="cursor-pointer">
                <Pencil class="size-4" />
              </Button>
            </Link>
            <form @submit.prevent="
              $inertia.delete(jadwalRoutes.destroy.url({ jadwal: j.id_jadwal }))
            ">
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
