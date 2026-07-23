<script setup lang="ts">
  import { ref, computed, watch } from "vue"
  import { router, usePage } from "@inertiajs/vue3"
  import { simpan } from "@/routes/booking"
  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Separator } from "@/components/ui/separator"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Train,
    User,
    Mail,
    Phone,
    ArmchairIcon,
    ArrowRight,
    MapPin,
    Clock,
    CalendarRange
  } from "@lucide/vue"
  import { useFormat } from "@/composables/useFormat"

  const page = usePage()

  const props = defineProps<{
    jadwal: {
      id_jadwal: number
      kereta: { nama_kereta: string; kelas: string }
      stasiun_asal: { nama_stasiun: string; kota: string }
      stasiun_tujuan: { nama_stasiun: string; kota: string }
      waktu_berangkat: string
      durasi_perjalanan: number
      harga: number
    }
    jadwalLainnya: {
      id_jadwal: number
      kereta: { nama_kereta: string; kelas: string }
      waktu_berangkat: string
      durasi_perjalanan: number
      harga: number
    }[]
    kursiTerpakai: string[]
    semuaKursi: string[]
    user: { id_penumpang: number; nama: string; email: string; no_hp: string }
  }>()

  const MAX_KURSI = 4
  const kursiDipilih = ref<string[]>([])
  const waktuBerangkatCustom = ref("")
  const errors = ref<Record<string, string>>({})

  watch(
    () => page.props.errors,
    newErrors => {
      if (newErrors) {
        errors.value = { ...errors.value, ...newErrors }
      }
    },
    { immediate: true, deep: true }
  )

  const { harga: formatHarga, waktu: formatWaktu } = useFormat()

  const totalHarga = computed(() => props.jadwal.harga * kursiDipilih.value.length)

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

  function toggleKursi(k: string) {
    if (props.kursiTerpakai.includes(k)) return

    const idx = kursiDipilih.value.indexOf(k)
    if (idx >= 0) {
      kursiDipilih.value.splice(idx, 1)
    } else if (kursiDipilih.value.length < MAX_KURSI) {
      kursiDipilih.value.push(k)
    }
  }

  function pilihJadwal(idJadwal: number) {
    router.visit(`/booking/${idJadwal}`, { preserveScroll: true })
  }

  function handleSimpan() {
    errors.value = {}

    if (kursiDipilih.value.length === 0) {
      errors.value.kursi = "Pilih minimal 1 kursi"
    }

    if (waktuBerangkatCustom.value) {
      const selectedDate = new Date(waktuBerangkatCustom.value)
      if (selectedDate <= new Date()) {
        errors.value.waktu_berangkat_custom = "Waktu berangkat harus setelah sekarang"
      }
    }

    if (Object.keys(errors.value).length > 0) return

    router.post(simpan.url(), {
      id_jadwal: props.jadwal.id_jadwal,
      kursi: kursiDipilih.value,
      waktu_berangkat_custom: waktuBerangkatCustom.value || null
    })
  }
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <h1 class="mb-6 text-2xl font-bold">Data Penumpang & Pilih Kursi</h1>

    <div class="grid gap-6 lg:grid-cols-5">
      <div class="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <User class="size-5" />
              Data Penumpang
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center gap-3">
              <User class="text-muted-foreground size-4" />
              <div>
                <p class="text-muted-foreground text-xs">Nama Lengkap</p>
                <p class="font-medium">{{ user.nama }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Mail class="text-muted-foreground size-4" />
              <div>
                <p class="text-muted-foreground text-xs">Email</p>
                <p class="font-medium">{{ user.email }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="text-muted-foreground size-4" />
              <div>
                <p class="text-muted-foreground text-xs">No. Handphone</p>
                <p class="font-medium">{{ user.no_hp }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          v-if="jadwalLainnya.length > 0"
          class="mt-6"
        >
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <CalendarRange class="size-5" />
              Jadwal Lainnya
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <button
                v-for="j in jadwalLainnya"
                :key="j.id_jadwal"
                type="button"
                class="hover:border-primary/50 hover:bg-primary/5 flex w-full cursor-pointer items-center justify-between rounded-lg border p-3 text-left transition-all"
                @click="pilihJadwal(j.id_jadwal)"
              >
                <div class="flex items-center gap-3">
                  <Train class="text-muted-foreground size-4" />
                  <div>
                    <p class="text-sm font-medium">{{ j.kereta.nama_kereta }}</p>
                    <p class="text-muted-foreground text-xs">{{ j.kereta.kelas }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium">
                    {{ formatWaktu(j.waktu_berangkat) }} -
                    {{ estimasiTiba(j.waktu_berangkat, j.durasi_perjalanan) }}
                  </p>
                  <p class="text-primary text-xs font-semibold">{{ formatHarga(j.harga) }}</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <ArmchairIcon class="size-5" />
              Pilih Kursi
              <Badge
                variant="secondary"
                class="ml-auto"
              >
                {{ kursiDipilih.length }} / {{ MAX_KURSI }}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="k in semuaKursi"
                :key="k"
                type="button"
                :disabled="kursiTerpakai.includes(k)"
                :class="[
                  'flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-all',
                  kursiTerpakai.includes(k)
                    ? 'bg-muted/50 text-muted-foreground/60 cursor-not-allowed line-through'
                    : kursiDipilih.includes(k)
                      ? 'bg-primary text-primary-foreground scale-110 shadow-md'
                      : 'bg-secondary hover:bg-secondary/80 hover:scale-105'
                ]"
                @click="toggleKursi(k)"
              >
                {{ k }}
              </button>
            </div>
            <div class="mt-4 flex items-center gap-4 text-sm">
              <span class="flex items-center gap-1"
                ><span class="bg-secondary inline-block size-4 rounded" /> Tersedia</span
              >
              <span class="flex items-center gap-1"
                ><span class="bg-primary inline-block size-4 rounded" /> Dipilih</span
              >
              <span class="flex items-center gap-1"
                ><span class="bg-muted inline-block size-4 rounded" /> Terisi</span
              >
            </div>
            <p
              v-if="errors.kursi"
              class="text-destructive mt-2 text-xs"
            >
              {{ errors.kursi }}
            </p>
          </CardContent>
        </Card>

        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Clock class="size-5" />
              Waktu Keberangkatan
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="rounded-lg border border-dashed p-3 text-sm">
              <p class="text-muted-foreground">Jadwal default:</p>
              <p class="font-medium">
                {{ formatWaktu(jadwal.waktu_berangkat) }} -
                {{ estimasiTiba(jadwal.waktu_berangkat, jadwal.durasi_perjalanan) }}
              </p>
              <p class="text-muted-foreground text-xs">
                (~{{ formatDurasi(jadwal.durasi_perjalanan) }})
              </p>
            </div>
            <div class="space-y-2">
              <Label for="waktu_custom">Atau atur waktu sendiri (opsional)</Label>
              <Input
                id="waktu_custom"
                v-model="waktuBerangkatCustom"
                type="datetime-local"
                :min="new Date().toISOString().slice(0, 16)"
              />
              <p
                v-if="errors.waktu_berangkat_custom"
                class="text-destructive text-xs"
              >
                {{ errors.waktu_berangkat_custom }}
              </p>
              <p class="text-muted-foreground text-xs">
                Kosongkan jika ingin menggunakan jadwal default
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="lg:col-span-2">
        <Card class="sticky top-4">
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Train class="size-5" />
              Ringkasan
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="flex items-center gap-2">
              <Train class="size-4" />
              <span class="font-medium">{{ jadwal.kereta.nama_kereta }}</span>
              <Badge
                variant="secondary"
                class="ml-auto"
                >{{ jadwal.kereta.kelas }}</Badge
              >
            </div>
            <Separator />
            <div class="flex items-center gap-2 text-sm">
              <MapPin class="size-4" />
              <span>{{ jadwal.stasiun_asal.nama_stasiun }} ({{ jadwal.stasiun_asal.kota }})</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <ArrowRight class="size-4" />
              <span
                >{{ jadwal.stasiun_tujuan.nama_stasiun }} ({{ jadwal.stasiun_tujuan.kota }})</span
              >
            </div>
            <Separator />
            <div class="flex items-center gap-2 text-sm">
              <Clock class="size-4" />
              <span v-if="waktuBerangkatCustom">
                <span class="text-muted-foreground line-through">{{
                  formatWaktu(jadwal.waktu_berangkat)
                }}</span>
                <span class="ml-1 font-medium">{{ formatWaktu(waktuBerangkatCustom) }}</span>
              </span>
              <span v-else>
                {{ formatWaktu(jadwal.waktu_berangkat) }} -
                {{ estimasiTiba(jadwal.waktu_berangkat, jadwal.durasi_perjalanan) }}
              </span>
            </div>
            <Separator />
            <div class="text-sm">
              <p class="mb-1 flex items-center gap-1 font-medium">
                <ArmchairIcon class="size-4" /> Kursi Dipilih
              </p>
              <div
                v-if="kursiDipilih.length > 0"
                class="flex flex-wrap gap-1"
              >
                <Badge
                  v-for="k in kursiDipilih"
                  :key="k"
                  variant="secondary"
                >
                  {{ k }}
                </Badge>
              </div>
              <p
                v-else
                class="text-muted-foreground"
              >
                Belum ada kursi dipilih
              </p>
            </div>
            <Separator />
            <div class="text-sm">
              <p class="text-muted-foreground">
                {{ kursiDipilih.length }} x {{ formatHarga(jadwal.harga) }}
              </p>
              <div class="flex items-center justify-between">
                <span class="font-medium">Total</span>
                <span class="text-primary text-xl font-bold">{{ formatHarga(totalHarga) }}</span>
              </div>
            </div>
            <Button
              class="mt-2 w-full cursor-pointer"
              size="lg"
              :disabled="kursiDipilih.length === 0"
              @click="handleSimpan"
            >
              Lanjut ke Pembayaran
              <ArrowRight class="ml-2 size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
