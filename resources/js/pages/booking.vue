<script setup lang="ts">
  import { ref, watch } from "vue"
  import { router, usePage } from "@inertiajs/vue3"
  import { simpan } from "@/routes/booking"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Badge } from "@/components/ui/badge"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Separator } from "@/components/ui/separator"
  import { Train, User, Mail, Phone, ArmchairIcon, ArrowRight, MapPin, Clock } from "@lucide/vue"
  import { useFormat } from "@/composables/useFormat"

  const page = usePage()

  const props = defineProps<{
    jadwal: {
      id_jadwal: number
      kereta: { nama_kereta: string; kelas: string }
      stasiun_asal: { nama_stasiun: string; kota: string }
      stasiun_tujuan: { nama_stasiun: string; kota: string }
      waktu_berangkat: string
      waktu_tiba: string
      harga: number
    }
    kursiTerpakai: string[]
    semuaKursi: string[]
  }>()

  const nama = ref("")
  const email = ref("")
  const no_hp = ref("")
  const kursi = ref("")
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

  function pilihKursi(k: string) {
    if (props.kursiTerpakai.includes(k)) return
    kursi.value = k
  }

  function handleSimpan() {
    errors.value = {}

    if (!nama.value) errors.value.nama = "Nama harus diisi"
    if (!email.value) errors.value.email = "Email harus diisi"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
      errors.value.email = "Format email tidak valid"
    if (!no_hp.value) errors.value.no_hp = "No HP harus diisi"
    if (!kursi.value) errors.value.kursi = "Pilih kursi terlebih dahulu"

    if (Object.keys(errors.value).length > 0) return

    router.post(simpan.url(), {
      id_jadwal: props.jadwal.id_jadwal,
      nama: nama.value,
      email: email.value,
      no_hp: no_hp.value,
      kursi: kursi.value
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
            <div class="space-y-2">
              <Label for="nama">Nama Lengkap</Label>
              <div class="relative">
                <User
                  class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
                />
                <Input
                  id="nama"
                  v-model="nama"
                  placeholder="Masukkan nama lengkap"
                  class="pl-9"
                />
              </div>
              <p
                v-if="errors.nama"
                class="text-destructive text-xs"
              >
                {{ errors.nama }}
              </p>
            </div>

            <div class="space-y-2">
              <Label for="email">Email</Label>
              <div class="relative">
                <Mail
                  class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
                />
                <Input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Masukkan email"
                  class="pl-9"
                />
              </div>
              <p
                v-if="errors.email"
                class="text-destructive text-xs"
              >
                {{ errors.email }}
              </p>
            </div>

            <div class="space-y-2">
              <Label for="no_hp">No. Handphone</Label>
              <div class="relative">
                <Phone
                  class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
                />
                <Input
                  id="no_hp"
                  v-model="no_hp"
                  placeholder="Masukkan no handphone"
                  class="pl-9"
                />
              </div>
              <p
                v-if="errors.no_hp"
                class="text-destructive text-xs"
              >
                {{ errors.no_hp }}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <ArmchairIcon class="size-5" />
              Pilih Kursi
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
                    : kursi === k
                      ? 'bg-primary text-primary-foreground scale-110 shadow-md'
                      : 'bg-secondary hover:bg-secondary/80 hover:scale-105'
                ]"
                @click="pilihKursi(k)"
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
              <span
                >{{ formatWaktu(jadwal.waktu_berangkat) }} -
                {{ formatWaktu(jadwal.waktu_tiba) }}</span
              >
            </div>
            <Separator />
            <div class="flex items-center gap-2 text-sm">
              <ArmchairIcon class="size-4" />
              <span
                >Kursi: <strong>{{ kursi || "-" }}</strong></span
              >
            </div>
            <Separator />
            <div class="flex items-center justify-between">
              <span class="text-sm">Total</span>
              <span class="text-primary text-xl font-bold">{{ formatHarga(jadwal.harga) }}</span>
            </div>
            <Button
              class="mt-2 w-full cursor-pointer"
              size="lg"
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
