<script setup lang="ts">
  import admin from "@/layouts/admin.vue"
  import { Link } from "@inertiajs/vue3"

  defineOptions({ layout: admin })

  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Plus, Pencil, Trash2, Train, Clock, MapPin } from "@lucide/vue"
  import { useFormat } from "@/composables/useFormat"
  import { useConfirmDelete } from "@/composables/useConfirmDelete"
  import PageHeader from "@/components/PageHeader.vue"
  import AdminListItem from "@/components/AdminListItem.vue"
  import EmptyState from "@/components/EmptyState.vue"
  import AppPagination from "@/components/AppPagination.vue"

  defineProps<{
    jadwals: {
      data: {
        id_jadwal: number
        kereta: { nama_kereta: string; kelas: string }
        stasiun_asal: { nama_stasiun: string; kota: string }
        stasiun_tujuan: { nama_stasiun: string; kota: string }
        waktu_berangkat: string
        waktu_tiba: string
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

  const { harga: formatHarga, waktu: formatWaktu, date: formatDate } = useFormat()
  const { hapus } = useConfirmDelete("jadwal")
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <PageHeader
      title="Daftar Jadwal"
      description="Kelola jadwal keberangkatan kereta"
    >
      <template #action>
        <Link href="/admin/jadwal/create">
          <Button class="cursor-pointer"><Plus class="mr-2 size-4" /> Tambah Jadwal</Button>
        </Link>
      </template>
    </PageHeader>

    <EmptyState
      v-if="jadwals.data.length === 0"
      message="Belum ada jadwal"
    />

    <div
      v-else
      class="space-y-3"
    >
      <AdminListItem
        v-for="j in jadwals.data"
        :key="j.id_jadwal"
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
            <span>{{ formatWaktu(j.waktu_berangkat) }} - {{ formatWaktu(j.waktu_tiba) }}</span>
            <span class="text-primary font-medium">{{ formatHarga(j.harga) }}</span>
          </div>
        </template>
        <template #actions>
          <Link :href="`/admin/jadwal/${j.id_jadwal}/edit`">
            <Button
              variant="outline"
              size="sm"
              class="cursor-pointer"
              ><Pencil class="size-4"
            /></Button>
          </Link>
          <form
            @submit.prevent="
              hapus(
                `/admin/jadwal/${j.id_jadwal}`,
                `${j.stasiun_asal.nama_stasiun} - ${j.stasiun_tujuan.nama_stasiun}`
              )
            "
          >
            <Button
              variant="destructive"
              size="sm"
              class="cursor-pointer"
              type="submit"
            >
              <Trash2 class="size-4" />
            </Button>
          </form>
        </template>
      </AdminListItem>
    </div>

    <AppPagination :meta="jadwals.meta" />
  </div>
</template>
