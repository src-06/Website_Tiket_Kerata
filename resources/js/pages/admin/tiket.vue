<script setup lang="ts">
  import admin from "@/layouts/admin.vue"
  import { Link } from "@inertiajs/vue3"
  import { invoice } from "@/routes"
  import { Badge } from "@/components/ui/badge"
  import { Input } from "@/components/ui/input"
  import { Train, Search, MapPin, ArmchairIcon } from "@lucide/vue"
  import { ref, computed } from "vue"

  defineOptions({ layout: admin })
  import { useFormat } from "@/composables/useFormat"
  import PageHeader from "@/components/PageHeader.vue"
  import AdminListItem from "@/components/AdminListItem.vue"
  import EmptyState from "@/components/EmptyState.vue"
  import AppPagination from "@/components/AppPagination.vue"

  const props = defineProps<{
    tikets: {
      data: {
        id_tiket: number
        total_harga: number
        status_pembayaran: string
        detail_tikets: {
          nama: string | null
          nama_kursi: string
          penumpang: { nama: string; email: string }
        }[]
        jadwal: {
          kereta: { nama_kereta: string; kelas: string }
          stasiun_asal: { nama_stasiun: string; kota: string }
          stasiun_tujuan: { nama_stasiun: string; kota: string }
          waktu_berangkat: string
        }
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
    if (!search.value) return props.tikets.data
    const q = search.value.toLowerCase()
    return props.tikets.data.filter(
      t =>
        t.detail_tikets.some(d => (d.nama || d.penumpang.nama).toLowerCase().includes(q)) ||
        t.jadwal.kereta.nama_kereta.toLowerCase().includes(q) ||
        t.detail_tikets.some(d => d.nama_kursi.toLowerCase().includes(q)) ||
        String(t.id_tiket).includes(q)
    )
  })

  const { harga: formatHarga, date: formatDate } = useFormat()
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <PageHeader
      title="Daftar Tiket"
      description="Semua tiket yang telah dipesan"
    >
      <template #action>
        <div class="relative w-64">
          <Search class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            v-model="search"
            placeholder="Cari tiket..."
            class="pl-9"
          />
        </div>
      </template>
    </PageHeader>

    <EmptyState
      v-if="filtered.length === 0"
      message="Tidak ada data tiket"
    />

    <div
      v-else
      class="space-y-3"
    >
      <AdminListItem
        v-for="t in filtered"
        :key="t.id_tiket"
        class="hover:bg-accent/50 transition-colors"
      >
        <template #icon><Train class="text-primary size-5" /></template>
        <template #content>
          <div class="flex items-center gap-2">
            <span class="font-medium">#TKT-{{ String(t.id_tiket).padStart(5, "0") }}</span>
            <Badge
              :variant="t.status_pembayaran === 'Lunas' ? 'default' : 'secondary'"
              :class="t.status_pembayaran === 'Lunas' ? 'bg-green-500' : ''"
            >
              {{ t.status_pembayaran }}
            </Badge>
          </div>
          <p class="text-muted-foreground mt-1 text-sm">
            {{ t.detail_tikets[0]?.nama ?? t.detail_tikets[0]?.penumpang.nama ?? "-" }} &middot;
            {{ t.jadwal.kereta.nama_kereta }} ({{ t.jadwal.kereta.kelas }})
          </p>
          <div
            class="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs"
          >
            <span class="flex items-center gap-1"
              ><MapPin class="size-3" /> {{ t.jadwal.stasiun_asal.nama_stasiun }} &rarr;
              {{ t.jadwal.stasiun_tujuan.nama_stasiun }}</span
            >
            <span class="flex items-center gap-1"
              ><ArmchairIcon class="size-3" />
              {{ t.detail_tikets.map(d => d.nama_kursi).join(", ") }}</span
            >
            <span>{{ formatDate(t.jadwal.waktu_berangkat) }}</span>
            <span class="text-primary font-medium">{{ formatHarga(t.total_harga) }}</span>
          </div>
        </template>
        <template #actions>
          <Link
            :href="invoice.url(t.id_tiket)"
            class="text-primary shrink-0 text-sm hover:underline"
          >
            Detail
          </Link>
        </template>
      </AdminListItem>
    </div>

    <AppPagination :meta="tikets.meta" />
  </div>
</template>
