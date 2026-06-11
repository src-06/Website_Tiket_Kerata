<script setup lang="ts">
import { ref } from "vue"
import { router } from "@inertiajs/vue3"
import { cari } from "@/routes/jadwal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Train, Route, UserCheck, CreditCard, ArrowRight } from "@lucide/vue"

defineProps<{
  stasiuns: { id_stasiun: number; nama_stasiun: string; kota: string }[]
}>()

const asal = ref("")
const tujuan = ref("")

function cariJadwal() {
  router.get(cari.url(), {
    asal: asal.value,
    tujuan: tujuan.value,
  })
}

const langkah = [
  { icon: Route, title: "Pilih Rute", desc: "Tentukan stasiun asal dan tujuan" },
  { icon: UserCheck, title: "Isi Data & Pilih Kursi", desc: "Lengkapi data diri dan pilih kursi favorit" },
  { icon: CreditCard, title: "Bayar & Dapatkan Tiket", desc: "Lakukan pembayaran dan terima e-tiket" },
]
</script>

<template>
  <div class="mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-4 py-8">
    <div class="text-center">
      <div class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
        <Train class="size-7 text-primary" />
      </div>
      <h1 class="text-3xl font-bold">Tiket Kereta</h1>
      <p class="text-muted-foreground mt-2 max-w-md text-sm">
        Simple, cepat, dan efisien dalam pemesanan kereta
      </p>
    </div>

    <Card class="w-full max-w-md">
      <CardHeader class="text-center">
        <p class="text-sm font-medium">Mulai Pemesanan</p>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="cariJadwal" class="space-y-4">
          <div class="space-y-2">
            <Label for="asal">Stasiun Asal</Label>
            <Select v-model="asal">
              <SelectTrigger id="asal" class="w-full">
                <SelectValue placeholder="Pilih stasiun asal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="s in stasiuns"
                  :key="s.id_stasiun"
                  :value="String(s.id_stasiun)"
                >
                  {{ s.nama_stasiun }} ({{ s.kota }})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="tujuan">Stasiun Tujuan</Label>
            <Select v-model="tujuan">
              <SelectTrigger id="tujuan" class="w-full">
                <SelectValue placeholder="Pilih stasiun tujuan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="s in stasiuns"
                  :key="s.id_stasiun"
                  :value="String(s.id_stasiun)"
                >
                  {{ s.nama_stasiun }} ({{ s.kota }})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" class="w-full cursor-pointer" size="lg">
            <Search class="mr-2 size-4" />
            Cari Tiket
          </Button>
        </form>
      </CardContent>
    </Card>

    <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <template v-for="(step, i) in langkah" :key="i">
        <div class="flex items-center gap-4 sm:flex-col sm:text-center">
          <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <component :is="step.icon" class="size-5 text-primary" />
          </div>
          <div>
            <p class="font-semibold text-sm">{{ step.title }}</p>
            <p class="text-muted-foreground text-xs">{{ step.desc }}</p>
          </div>
        </div>
        <ArrowRight v-if="i < langkah.length - 1" class="size-4 rotate-90 text-muted-foreground sm:rotate-0" />
      </template>
    </div>
  </div>
</template>
