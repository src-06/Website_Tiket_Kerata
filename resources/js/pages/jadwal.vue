<script setup lang="ts">
  import { Link } from "@inertiajs/vue3"
  import { home } from "@/routes"
  import { form } from "@/routes/booking"
  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Separator } from "@/components/ui/separator"
  import { ArrowRight, Train, MapPin, Clock } from "@lucide/vue"
  import { useFormat } from "@/composables/useFormat"

  defineProps<{
    jadwals: {
      id_jadwal: number
      kereta: { nama_kereta: string; kelas: string }
      stasiun_asal: { nama_stasiun: string; kota: string }
      stasiun_tujuan: { nama_stasiun: string; kota: string }
      waktu_berangkat: string
      waktu_tiba: string
      harga: number
    }[]
    stasiunAsal: { nama_stasiun: string; kota: string }
    stasiunTujuan: { nama_stasiun: string; kota: string }
  }>()

  const { harga: formatHarga, waktu: formatWaktu } = useFormat()
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <div class="mb-6">
      <Link
        :href="home.url()"
        class="text-muted-foreground hover:text-primary mb-2 inline-flex items-center gap-1 text-sm"
      >
        &larr; Kembali ke Pencarian
      </Link>
      <h1 class="text-2xl font-bold">Hasil Pencarian</h1>
      <p class="text-muted-foreground mt-1 flex items-center gap-2">
        <MapPin class="size-4" />
        {{ stasiunAsal.nama_stasiun }} ({{ stasiunAsal.kota }})
        <ArrowRight class="size-4" />
        {{ stasiunTujuan.nama_stasiun }} ({{ stasiunTujuan.kota }})
      </p>
    </div>

    <div
      v-if="jadwals.length === 0"
      class="py-16 text-center"
    >
      <Train class="text-muted-foreground mx-auto mb-4 size-12" />
      <p class="text-muted-foreground text-lg">Tidak ada jadwal yang tersedia</p>
      <p class="text-muted-foreground text-sm">Coba cari dengan rute atau tanggal lain</p>
    </div>

    <div
      v-else
      class="space-y-4"
    >
      <Card
        v-for="jadwal in jadwals"
        :key="jadwal.id_jadwal"
      >
        <CardHeader class="flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <Train class="size-5" />
            <div>
              <CardTitle class="text-lg">{{ jadwal.kereta.nama_kereta }}</CardTitle>
              <p class="text-muted-foreground text-sm">{{ jadwal.kereta.kelas }}</p>
            </div>
          </div>
          <Badge variant="secondary">{{ jadwal.kereta.kelas }}</Badge>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-3 items-center gap-4 text-center">
            <div>
              <p class="text-2xl font-bold">{{ formatWaktu(jadwal.waktu_berangkat) }}</p>
              <p class="text-muted-foreground text-sm">{{ jadwal.stasiun_asal.nama_stasiun }}</p>
            </div>
            <div class="flex flex-col items-center">
              <Separator class="w-full" />
              <Clock class="text-muted-foreground my-1 size-4" />
              <span class="text-muted-foreground text-xs">Langsung</span>
              <Separator class="w-full" />
            </div>
            <div>
              <p class="text-2xl font-bold">{{ formatWaktu(jadwal.waktu_tiba) }}</p>
              <p class="text-muted-foreground text-sm">{{ jadwal.stasiun_tujuan.nama_stasiun }}</p>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between border-t pt-4">
            <p class="text-primary text-xl font-bold">{{ formatHarga(jadwal.harga) }}</p>
            <Link :href="form.url(jadwal.id_jadwal)">
              <Button class="cursor-pointer">Pilih Kereta</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
