<script setup lang="ts">
  import admin from "@/layouts/admin.vue"
  import { Ticket, CalendarRange, Train, Building2, Users, Banknote } from "@lucide/vue"

  defineOptions({ layout: admin })
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import PageHeader from "@/components/PageHeader.vue"
  import { useFormat } from "@/composables/useFormat"

  const props = defineProps<{
    stats: {
      tiket: number
      jadwal: number
      kereta: number
      stasiun: number
      penumpang: number
      pendapatan: number
    }
    tiketTerbaru: {
      id_tiket: number
      kursi: string
      jumlah_penumpang: number
      total_harga: number
      status_pembayaran: string
      penumpang: string
      kereta: { nama_kereta: string }
    }[]
  }>()

  const { harga: formatHarga } = useFormat()

  const kartuStats = [
    { label: "Total Tiket", value: props.stats.tiket, icon: Ticket, color: "text-blue-500" },
    {
      label: "Total Jadwal",
      value: props.stats.jadwal,
      icon: CalendarRange,
      color: "text-orange-500"
    },
    { label: "Total Kereta", value: props.stats.kereta, icon: Train, color: "text-green-500" },
    {
      label: "Total Stasiun",
      value: props.stats.stasiun,
      icon: Building2,
      color: "text-purple-500"
    },
    { label: "Total Penumpang", value: props.stats.penumpang, icon: Users, color: "text-cyan-500" },
    {
      label: "Pendapatan",
      value: formatHarga(props.stats.pendapatan),
      icon: Banknote,
      color: "text-emerald-500"
    }
  ]
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <PageHeader
      title="Dashboard Admin"
      description="Ringkasan data tiket kereta"
    />

    <div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="s in kartuStats"
        :key="s.label"
      >
        <CardHeader class="flex flex-row items-center justify-between pb-2">
          <CardTitle class="text-sm font-medium">{{ s.label }}</CardTitle>
          <component
            :is="s.icon"
            :class="['size-4', s.color]"
          />
        </CardHeader>
        <CardContent>
          <p class="text-2xl font-bold">{{ s.value }}</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Tiket Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          v-if="tiketTerbaru.length === 0"
          class="text-muted-foreground py-4 text-center text-sm"
        >
          Belum ada tiket
        </div>
        <div
          v-else
          class="space-y-3"
        >
          <div
            v-for="t in tiketTerbaru"
            :key="t.id_tiket"
            class="flex items-center justify-between rounded-lg border p-3"
          >
            <div>
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
                {{ t.penumpang }} &middot; {{ t.kereta.nama_kereta }} &middot; Kursi
                {{ t.kursi }}
              </p>
            </div>
            <span class="text-primary text-sm font-semibold">{{
              formatHarga(t.total_harga)
            }}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
