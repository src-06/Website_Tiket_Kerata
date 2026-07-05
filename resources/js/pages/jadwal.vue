<script setup lang="ts">
  import { Link } from "@inertiajs/vue3"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Train, Clock, MapPin, ArrowRight, Search } from "@lucide/vue"
  import { ref, computed } from "vue"
  import { useFormat } from "@/composables/useFormat"
  import PageHeader from "@/components/PageHeader.vue"
  import AdminListItem from "@/components/AdminListItem.vue"
  import EmptyState from "@/components/EmptyState.vue"
  import AppPagination from "@/components/AppPagination.vue"

  const props = defineProps<{
    jadwals: {
      data: {
        id_jadwal: number
        kereta: { nama_kereta: string; kelas: string }
        stasiun_asal: { nama_stasiun: string; kota: string }
        stasiun_tujuan: { nama_stasiun: string; kota: string }
        waktu_berangkat: string
        durasi_perjalanan: number
        harga: number
      }[]
      meta: {
        current_page: number
        last_page: number
        from: number | null
        to: number | null
        total: number
        links: { url: string | null; label: string; active: boolean }[]
      }
    }
  }>()

  const search = ref("")

  const filtered = computed(() => {
    if (!search.value) return props.jadwals.data
    const q = search.value.toLowerCase()
    return props.jadwals.data.filter(
      j =>
        j.kereta.nama_kereta.toLowerCase().includes(q) ||
        j.stasiun_asal.nama_stasiun.toLowerCase().includes(q) ||
        j.stasiun_tujuan.nama_stasiun.toLowerCase().includes(q)
    )
  })

  const { harga: formatHarga, waktu: formatWaktu, date: formatDate } = useFormat()

  function estimasiTiba(waktuBerangkat: string, durasi: number) {
    const d = new Date(waktuBerangkat)
    d.setMinutes(d.getMinutes() + durasi)
    return formatWaktu(d.toISOString())
  }

  function formatDurasi(menit: number) {
    const j = Math.floor(menit / 60)
    const m = menit % 60
    if (j > 0 && m > 0) return `${j}j ${m}m`
    if (j > 0) return `${j} jam`
    return `${m} menit`
  }
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <PageHeader
      title="Daftar Jadwal"
      description="Jadwal kereta yang tersedia untuk dipesan"
    >
      <template #action>
        <div class="relative w-64">
          <Search class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            v-model="search"
            placeholder="Cari jadwal..."
            class="pl-9"
          />
        </div>
      </template>
    </PageHeader>

    <EmptyState
      v-if="filtered.length === 0"
      message="Tidak ada jadwal tersedia"
    />

    <div
      v-else
      class="space-y-3"
    >
      <AdminListItem
        v-for="j in filtered"
        :key="j.id_jadwal"
        class="hover:bg-accent/50 transition-colors"
      >
        <template #icon><Train class="text-primary size-5" /></template>
        <template #content>
          <div class="flex items-center gap-2">
            <span class="font-medium">{{ j.kereta.nama_kereta }}</span>
            <Badge variant="secondary">{{ j.kereta.kelas }}</Badge>
          </div>
          <div
            class="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm"
          >
            <span class="flex items-center gap-1">
              <MapPin class="size-3" /> {{ j.stasiun_asal.nama_stasiun }} &rarr;
              {{ j.stasiun_tujuan.nama_stasiun }}
            </span>
            <span class="flex items-center gap-1"
              ><Clock class="size-3" /> {{ formatDate(j.waktu_berangkat) }}</span
            >
            <span>{{ formatWaktu(j.waktu_berangkat) }} - {{ estimasiTiba(j.waktu_berangkat, j.durasi_perjalanan) }}</span>
            <span class="text-muted-foreground text-xs">(~{{ formatDurasi(j.durasi_perjalanan) }})</span>
            <span class="text-primary font-medium">{{ formatHarga(j.harga) }}</span>
          </div>
        </template>
        <template #actions>
          <Link :href="`/booking/${j.id_jadwal}`">
            <Button
              size="sm"
              class="cursor-pointer"
            >
              Pesan
              <ArrowRight class="ml-1 size-4" />
            </Button>
          </Link>
        </template>
      </AdminListItem>
    </div>

    <AppPagination :meta="jadwals.meta" />
  </div>
</template>
