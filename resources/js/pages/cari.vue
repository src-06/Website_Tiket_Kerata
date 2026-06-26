<script setup lang="ts">
  import { ref } from "vue"
  import { router } from "@inertiajs/vue3"
  import { cari } from "@/routes/jadwal"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from "@/components/ui/select"
  import { Search, Train } from "@lucide/vue"

  defineProps<{
    stasiuns: { id_stasiun: number; nama_stasiun: string; kota: string }[]
  }>()

  const asal = ref("")
  const tujuan = ref("")

  function cariJadwal() {
    router.post(cari.url(), {
      asal: asal.value,
      tujuan: tujuan.value
    })
  }
</script>

<template>
  <div class="mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
    <Card class="w-full max-w-md shadow-lg">
      <CardHeader class="text-center">
        <div class="bg-primary/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
          <Train class="text-primary size-6" />
        </div>
        <CardTitle class="text-xl">Cari Tiket Kereta</CardTitle>
        <CardDescription>Pilih stasiun asal dan tujuan</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          class="space-y-4"
          @submit.prevent="cariJadwal"
        >
          <div class="space-y-2">
            <Label for="asal">Stasiun Asal</Label>
            <Select v-model="asal">
              <SelectTrigger
                id="asal"
                class="w-full"
              >
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
              <SelectTrigger
                id="tujuan"
                class="w-full"
              >
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

          <Button
            type="submit"
            class="w-full cursor-pointer"
            size="lg"
          >
            <Search class="mr-2 size-4" />
            Cari Tiket
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
