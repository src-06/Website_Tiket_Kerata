<script setup lang="ts">
  import { Link } from "@inertiajs/vue3"
  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
  import { Separator } from "@/components/ui/separator"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import {
    CheckCircle,
    Train,
    Clock,
    ArmchairIcon,
    User,
    CreditCard,
    Printer
  } from "@lucide/vue"
  import { useFormat } from "@/composables/useFormat"

  defineProps<{
    tiket: {
      id_tiket: number
      id_jadwal: number
      total_harga: number
      status_pembayaran: string
      waktu_berangkat_custom: string | null
      detail_tikets: {
        id_detail_tiket: number
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
      pembayaran: {
        id_pembayaran: number
        tanggal_bayar: string
        metode_bayar: string
        jumlah: number
      }
    }
  }>()

  const { harga: formatHarga, waktu: formatWaktu, tanggalLengkap } = useFormat()

  function estimasiTiba(waktuBerangkat: string, durasi: number) {
    const d = new Date(waktuBerangkat)
    d.setMinutes(d.getMinutes() + durasi)
    return formatWaktu(d.toISOString())
  }

  function cetak() {
    window.print()
  }
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <div class="no-print mb-6 text-center">
      <CheckCircle class="mx-auto mb-2 size-16 text-green-500" />
      <h1 class="text-2xl font-bold text-green-600">Pembayaran Berhasil!</h1>
      <p class="text-muted-foreground">
        Tiket kereta berhasil dipesan. Simpan invoice ini sebagai bukti pemesanan.
      </p>
    </div>

    <Card id="invoice-area">
      <CardHeader class="border-b pb-4 text-center print:pt-0 print:pb-1">
        <div class="flex items-center justify-center gap-2">
          <Train class="size-6 print:size-5" />
          <CardTitle class="text-xl print:text-lg">E-Tiket Kereta</CardTitle>
        </div>
        <Badge
          variant="outline"
          class="mt-1 bg-green-50 text-green-700 print:px-2 print:py-0 print:text-xs"
          >LUNAS</Badge
        >
      </CardHeader>
      <CardContent class="space-y-3 pt-4 print:space-y-1 print:pt-1 print:text-xs">
        <div class="grid grid-cols-2 gap-4 print:gap-1">
          <div>
            <p class="text-muted-foreground text-xs uppercase print:text-[10px]">Kode Tiket</p>
            <p class="font-mono font-bold print:text-sm">
              #TKT-{{ String(tiket.id_tiket).padStart(5, "0") }}
            </p>
          </div>
          <div>
            <p class="text-muted-foreground text-xs uppercase print:text-[10px]">Status</p>
            <Badge
              variant="default"
              class="bg-green-500 print:px-2 print:py-0 print:text-xs"
              >{{ tiket.status_pembayaran }}</Badge
            >
          </div>
        </div>

        <Separator class="print:hidden" />

        <div>
          <p class="text-muted-foreground mb-1 text-xs uppercase print:mb-0 print:text-[10px]">
            Informasi Kereta
          </p>
          <div class="flex items-center gap-2">
            <Train class="size-5 print:size-4" />
            <span class="text-lg font-bold print:text-sm">{{
              tiket.jadwal.kereta.nama_kereta
            }}</span>
            <Badge
              variant="secondary"
              class="print:px-2 print:py-0 print:text-xs"
              >{{ tiket.jadwal.kereta.kelas }}</Badge
            >
          </div>
        </div>

        <Separator class="print:hidden" />

        <div class="text-center">
          <p class="text-muted-foreground text-xs uppercase print:text-[10px]">
            Tanggal Keberangkatan
          </p>
          <p class="text-sm font-medium print:text-xs">
            {{
              tiket.waktu_berangkat_custom
                ? tanggalLengkap(tiket.waktu_berangkat_custom)
                : tanggalLengkap(tiket.jadwal.waktu_berangkat)
            }}
          </p>
        </div>

        <div class="grid grid-cols-3 items-center gap-3 text-center print:gap-0.5">
          <div>
            <p class="text-lg font-bold print:text-sm">
              {{
                tiket.waktu_berangkat_custom
                  ? formatWaktu(tiket.waktu_berangkat_custom)
                  : formatWaktu(tiket.jadwal.waktu_berangkat)
              }}
            </p>
            <p class="text-muted-foreground text-sm print:text-xs">
              {{ tiket.jadwal.stasiun_asal.nama_stasiun }}
            </p>
            <p class="text-muted-foreground text-xs print:text-[10px]">
              {{ tiket.jadwal.stasiun_asal.kota }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <Separator class="w-full" />
            <Clock class="text-muted-foreground my-1 size-4 print:my-0.5 print:size-3" />
            <span class="text-muted-foreground text-xs print:text-[10px]">Langsung</span>
            <Separator class="w-full" />
          </div>
          <div>
            <p class="text-lg font-bold print:text-sm">
              {{
                tiket.waktu_berangkat_custom
                  ? estimasiTiba(tiket.waktu_berangkat_custom, tiket.jadwal.durasi_perjalanan)
                  : estimasiTiba(tiket.jadwal.waktu_berangkat, tiket.jadwal.durasi_perjalanan)
              }}
            </p>
            <p class="text-muted-foreground text-sm print:text-xs">
              {{ tiket.jadwal.stasiun_tujuan.nama_stasiun }}
            </p>
            <p class="text-muted-foreground text-xs print:text-[10px]">
              {{ tiket.jadwal.stasiun_tujuan.kota }}
            </p>
          </div>
        </div>

        <Separator class="print:hidden" />

        <div>
          <p class="text-muted-foreground mb-1 text-xs uppercase print:mb-0 print:text-[10px]">
            Daftar Penumpang & Kursi
          </p>
          <div class="space-y-1 text-sm print:text-xs">
            <div
              v-for="(d, i) in tiket.detail_tikets"
              :key="d.id_detail_tiket"
              class="flex items-center justify-between rounded bg-secondary/30 px-2 py-1"
            >
              <div class="flex items-center gap-2">
                <span class="text-muted-foreground">{{ i + 1 }}.</span>
                <User class="size-3 print:size-2.5" />
                <span>{{ d.penumpang.nama }}</span>
              </div>
              <div class="flex items-center gap-1 font-medium">
                <ArmchairIcon class="size-3 print:size-2.5" />
                {{ d.nama_kursi }}
              </div>
            </div>
          </div>
        </div>

        <Separator class="print:hidden" />

        <div class="flex items-center justify-between">
          <p class="text-muted-foreground text-xs uppercase print:text-[10px]">Total</p>
          <p class="text-primary text-lg font-bold print:text-sm">
            {{ formatHarga(tiket.total_harga) }}
          </p>
        </div>

        <Separator class="print:hidden" />

        <div>
          <p class="text-muted-foreground mb-1 text-xs uppercase print:mb-0 print:text-[10px]">
            Informasi Pembayaran
          </p>
          <div class="space-y-0.5 text-sm print:text-xs">
            <p class="flex items-center gap-2">
              <CreditCard class="size-4 print:size-3" /> {{ tiket.pembayaran.metode_bayar }}
            </p>
            <p class="text-muted-foreground text-xs print:text-[10px]">
              Tanggal: {{ tanggalLengkap(tiket.pembayaran.tanggal_bayar, true) }}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="no-print mt-6 flex justify-center gap-4">
      <Button
        variant="outline"
        class="cursor-pointer"
        @click="cetak"
      >
        <Printer class="mr-2 size-4" /> Cetak
      </Button>
      <Link :href="`/booking/${tiket.id_jadwal}`">
        <Button class="cursor-pointer"> <Train class="mr-2 size-4" /> Pesan Lagi </Button>
      </Link>
    </div>
  </div>
</template>

<style>
  @media print {
    html:root {
      --background: oklch(1 0 0);
      --foreground: oklch(0.145 0 0);
      --card: oklch(1 0 0);
      --card-foreground: oklch(0.145 0 0);
      --popover: oklch(1 0 0);
      --popover-foreground: oklch(0.145 0 0);
      --primary: oklch(0.205 0 0);
      --primary-foreground: oklch(0.985 0 0);
      --secondary: oklch(0.97 0 0);
      --secondary-foreground: oklch(0.205 0 0);
      --muted: oklch(0.97 0 0);
      --muted-foreground: oklch(0.556 0 0);
      --accent: oklch(0.97 0 0);
      --accent-foreground: oklch(0.205 0 0);
      --destructive: oklch(0.577 0.245 27.325);
      --destructive-foreground: oklch(0.577 0.245 27.325);
      --border: oklch(0.922 0 0);
      --input: oklch(0.922 0 0);
      --ring: oklch(0.708 0 0);
      --sidebar: oklch(0.985 0 0);
      --sidebar-foreground: oklch(0.145 0 0);
      --sidebar-primary: oklch(0.205 0 0);
      --sidebar-primary-foreground: oklch(0.985 0 0);
      --sidebar-accent: oklch(0.97 0 0);
      --sidebar-accent-foreground: oklch(0.205 0 0);
      --sidebar-border: oklch(0.922 0 0);
      --sidebar-ring: oklch(0.708 0 0);
    }

    @page {
      size: A4;
      margin: 8mm;
    }
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .no-print {
      display: none !important;
    }
    #invoice-area {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    #invoice-area .text-muted-foreground {
      color: #666 !important;
    }
    #invoice-area img,
    #invoice-area svg {
      print-color-adjust: exact;
    }
  }
</style>
