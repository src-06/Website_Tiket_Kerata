<script setup lang="ts">
  import { ref } from "vue"
  import { router } from "@inertiajs/vue3"
  import { proses } from "@/routes/pembayaran"
  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Separator } from "@/components/ui/separator"
  import {
    Train,
    MapPin,
    Clock,
    Wallet,
    CreditCard,
    QrCode,
    CheckCircle,
    ArmchairIcon
  } from "@lucide/vue"
  import { useFormat } from "@/composables/useFormat"

  const props = defineProps<{
    tiket: {
      id_tiket: number
      total_harga: number
      status_pembayaran: string
      waktu_berangkat_custom: string | null
      detail_tikets: {
        id_detail_tiket: number
        nama: string | null
        nama_kursi: string
        harga_satuan: number
        penumpang: { nama: string; email: string; no_hp: string }
      }[]
      jadwal: {
        kereta: { nama_kereta: string; kelas: string }
        stasiun_asal: { nama_stasiun: string; kota: string }
        stasiun_tujuan: { nama_stasiun: string; kota: string }
        waktu_berangkat: string
        durasi_perjalanan: number
      }
    }
  }>()

  const metodeBayar = ref("")
  const loading = ref(false)
  const { harga: formatHarga, waktu: formatWaktu } = useFormat()

  function estimasiTiba(waktuBerangkat: string, durasi: number) {
    const d = new Date(waktuBerangkat)
    d.setMinutes(d.getMinutes() + durasi)
    return formatWaktu(d.toISOString())
  }

  function bayar() {
    if (!metodeBayar.value) return
    loading.value = true
    router.post(proses.url(props.tiket.id_tiket), {
      metode_bayar: metodeBayar.value
    })
  }

  const metodePembayaran = [
    {
      id: "Transfer Bank",
      label: "Transfer Bank",
      icon: CreditCard,
      desc: "BCA, Mandiri, BNI, BRI"
    },
    { id: "E-Wallet", label: "E-Wallet", icon: Wallet, desc: "GoPay, OVO, Dana, ShopeePay" },
    { id: "QRIS", label: "QRIS", icon: QrCode, desc: "Scan QRIS di aplikasi pembayaran" }
  ]
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <div class="mb-6 flex items-center gap-2">
      <Wallet class="size-6" />
      <h1 class="text-2xl font-bold">Pembayaran</h1>
    </div>

    <div class="grid gap-6 lg:grid-cols-5">
      <div class="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Wallet class="size-5" />
              Pilih Metode Pembayaran
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <button
              v-for="m in metodePembayaran"
              :key="m.id"
              type="button"
              :class="[
                'flex w-full cursor-pointer items-center gap-4 rounded-lg border p-4 text-left transition-all',
                metodeBayar === m.id
                  ? 'border-primary bg-primary/5 ring-primary/20 ring-2'
                  : 'hover:border-primary/50'
              ]"
              @click="metodeBayar = m.id"
            >
              <component
                :is="m.icon"
                class="size-8"
                :class="metodeBayar === m.id ? 'text-primary' : 'text-muted-foreground'"
              />
              <div>
                <p class="font-medium">{{ m.label }}</p>
                <p class="text-muted-foreground text-sm">{{ m.desc }}</p>
              </div>
              <CheckCircle
                v-if="metodeBayar === m.id"
                class="text-primary ml-auto size-5"
              />
            </button>
          </CardContent>
        </Card>
      </div>

      <div class="lg:col-span-2">
        <Card class="sticky top-4">
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Train class="size-5" />
              Ringkasan Tiket
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="flex items-center gap-2">
              <Train class="size-4" />
              <span class="font-medium">{{ tiket.jadwal.kereta.nama_kereta }}</span>
              <Badge
                variant="secondary"
                class="ml-auto"
                >{{ tiket.jadwal.kereta.kelas }}</Badge
              >
            </div>
            <Separator />
            <div class="flex items-center gap-2 text-sm">
              <MapPin class="size-4" />
              <span
                >{{ tiket.jadwal.stasiun_asal.nama_stasiun }} &rarr;
                {{ tiket.jadwal.stasiun_tujuan.nama_stasiun }}</span
              >
            </div>
            <div class="flex items-center gap-2 text-sm">
              <Clock class="size-4" />
              <span v-if="tiket.waktu_berangkat_custom">
                <span class="text-muted-foreground line-through">{{
                  formatWaktu(tiket.jadwal.waktu_berangkat)
                }}</span>
                <span class="ml-1 font-medium">{{
                  formatWaktu(tiket.waktu_berangkat_custom)
                }}</span>
              </span>
              <span v-else>
                {{ formatWaktu(tiket.jadwal.waktu_berangkat) }} -
                {{ estimasiTiba(tiket.jadwal.waktu_berangkat, tiket.jadwal.durasi_perjalanan) }}
              </span>
            </div>
            <Separator />
            <div class="text-sm">
              <p class="mb-2 font-medium">Penumpang & Kursi</p>
              <div class="space-y-2">
                <div
                  v-for="(d, i) in tiket.detail_tikets"
                  :key="d.id_detail_tiket"
                  class="bg-secondary/50 flex items-center justify-between rounded-md px-3 py-2"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-muted-foreground text-xs font-medium">{{ i + 1 }}.</span>
                    <span>{{ d.nama || d.penumpang.nama }}</span>
                  </div>
                  <Badge variant="outline">
                    <ArmchairIcon class="mr-1 size-3" />
                    {{ d.nama_kursi }}
                  </Badge>
                </div>
              </div>
            </div>
            <Separator />
            <div class="flex items-center justify-between">
              <span class="text-sm">Total</span>
              <span class="text-primary text-xl font-bold">{{
                formatHarga(tiket.total_harga)
              }}</span>
            </div>
            <Button
              class="mt-2 w-full cursor-pointer"
              size="lg"
              :disabled="!metodeBayar || loading"
              @click="bayar"
            >
              {{ loading ? "Memproses..." : "Bayar Sekarang" }}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
