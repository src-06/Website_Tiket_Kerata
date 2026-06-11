<script setup lang="ts">
import { Link } from "@inertiajs/vue3"
import { invoice } from "@/routes"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Train, Search, MapPin, ArmchairIcon } from "@lucide/vue"
import { ref, computed } from "vue"

const props = defineProps<{
  tikets: {
    id_tiket: number
    kursi: string
    harga: number
    status_pembayaran: string
    penumpang: { nama: string; email: string }
    jadwal: {
      kereta: { nama_kereta: string; kelas: string }
      stasiun_asal: { nama_stasiun: string; kota: string }
      stasiun_tujuan: { nama_stasiun: string; kota: string }
      waktu_berangkat: string
    }
  }[]
}>()

const search = ref("")

const filtered = computed(() => {
  if (!search.value) return props.tikets
  const q = search.value.toLowerCase()
  return props.tikets.filter(
    (t) =>
      t.penumpang.nama.toLowerCase().includes(q) ||
      t.jadwal.kereta.nama_kereta.toLowerCase().includes(q) ||
      t.kursi.toLowerCase().includes(q) ||
      String(t.id_tiket).includes(q),
  )
})

function formatHarga(amount: number) {
  return "Rp " + amount.toLocaleString("id-ID")
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Daftar Tiket</h1>
        <p class="text-muted-foreground text-sm">Semua tiket yang telah dipesan</p>
      </div>
      <div class="relative w-64">
        <Search class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input v-model="search" placeholder="Cari tiket..." class="pl-9" />
      </div>
    </div>

    <Card v-if="filtered.length === 0">
      <CardContent class="py-12 text-center">
        <p class="text-muted-foreground">Tidak ada data tiket</p>
      </CardContent>
    </Card>

    <div v-else class="space-y-3">
      <Card v-for="t in filtered" :key="t.id_tiket" class="hover:bg-accent/50 transition-colors">
        <CardContent class="flex items-center gap-4 py-4">
          <div class="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <Train class="size-5 text-primary" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium">#TKT-{{ String(t.id_tiket).padStart(5, "0") }}</span>
              <Badge :variant="t.status_pembayaran === 'Lunas' ? 'default' : 'secondary'"
                :class="t.status_pembayaran === 'Lunas' ? 'bg-green-500' : ''">
                {{ t.status_pembayaran }}
              </Badge>
            </div>
            <p class="text-muted-foreground mt-1 text-sm">
              {{ t.penumpang.nama }} &middot; {{ t.jadwal.kereta.nama_kereta }} ({{ t.jadwal.kereta.kelas }})
            </p>
            <div class="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span class="flex items-center gap-1"><MapPin class="size-3" /> {{ t.jadwal.stasiun_asal.nama_stasiun }} &rarr; {{ t.jadwal.stasiun_tujuan.nama_stasiun }}</span>
              <span class="flex items-center gap-1"><ArmchairIcon class="size-3" /> {{ t.kursi }}</span>
              <span>{{ formatDate(t.jadwal.waktu_berangkat) }}</span>
              <span class="font-medium text-primary">{{ formatHarga(t.harga) }}</span>
            </div>
          </div>
          <Link :href="invoice.url(t.id_tiket)" class="text-primary hover:underline text-sm shrink-0">
            Detail
          </Link>
        </CardContent>
      </Card>

      <p class="text-muted-foreground mt-2 text-center text-xs">
        Menampilkan {{ filtered.length }} dari {{ tikets.length }} tiket
      </p>
    </div>
  </div>
</template>
