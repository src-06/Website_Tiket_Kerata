<script setup lang="ts">
  import admin from "@/layouts/admin.vue"
  import { ref } from "vue"

  defineOptions({ layout: admin })

  import { router } from "@inertiajs/vue3"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from "@/components/ui/select"
  import { Clock } from "@lucide/vue"
  import AdminFormLayout from "@/components/AdminFormLayout.vue"

  const props = defineProps<{
    jadwal?: {
      id_jadwal: number
      id_kereta: number
      id_stasiun_asal: number
      id_stasiun_tujuan: number
      waktu_berangkat: string
      durasi_perjalanan: number
      harga: number
    }
    keretas: { id_kereta: number; nama_kereta: string; kelas: string }[]
    stasiuns: { id_stasiun: number; nama_stasiun: string; kota: string }[]
  }>()

  const isEdit = !!props.jadwal

  function toDatetimeLocal(iso: string) {
    if (!iso) return ""
    const d = new Date(iso)
    const pad = (n: number) => String(n).padStart(2, "0")
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  }

  const id_kereta = ref(props.jadwal ? String(props.jadwal.id_kereta) : "")
  const id_stasiun_asal = ref(props.jadwal ? String(props.jadwal.id_stasiun_asal) : "")
  const id_stasiun_tujuan = ref(props.jadwal ? String(props.jadwal.id_stasiun_tujuan) : "")
  const waktu_berangkat = ref(props.jadwal ? toDatetimeLocal(props.jadwal.waktu_berangkat) : "")
  const durasi_perjalanan = ref(props.jadwal ? String(props.jadwal.durasi_perjalanan) : "60")
  const harga = ref(props.jadwal ? String(props.jadwal.harga) : "")

  function submit() {
    const payload = {
      id_kereta: Number(id_kereta.value),
      id_stasiun_asal: Number(id_stasiun_asal.value),
      id_stasiun_tujuan: Number(id_stasiun_tujuan.value),
      waktu_berangkat: waktu_berangkat.value,
      durasi_perjalanan: Number(durasi_perjalanan.value),
      harga: Number(harga.value)
    }

    if (isEdit) {
      router.put(`/admin/jadwal/${props.jadwal!.id_jadwal}`, payload)
    } else {
      router.post("/admin/jadwal", payload)
    }
  }
</script>

<template>
  <AdminFormLayout
    :icon="Clock"
    title="Jadwal"
    back-url="/admin/jadwal"
    :is-edit="isEdit"
    @submit="submit"
  >
    <div class="space-y-2">
      <Label for="id_kereta">Kereta</Label>
      <Select v-model="id_kereta">
        <SelectTrigger
          id="id_kereta"
          class="w-full"
        >
          <SelectValue placeholder="Pilih kereta" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="k in keretas"
            :key="k.id_kereta"
            :value="String(k.id_kereta)"
          >
            {{ k.nama_kereta }} ({{ k.kelas }})
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="space-y-2">
      <Label for="id_stasiun_asal">Stasiun Asal</Label>
      <Select v-model="id_stasiun_asal">
        <SelectTrigger
          id="id_stasiun_asal"
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
      <Label for="id_stasiun_tujuan">Stasiun Tujuan</Label>
      <Select v-model="id_stasiun_tujuan">
        <SelectTrigger
          id="id_stasiun_tujuan"
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

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="waktu_berangkat">Waktu Berangkat</Label>
        <Input
          id="waktu_berangkat"
          v-model="waktu_berangkat"
          type="datetime-local"
        />
      </div>
      <div class="space-y-2">
        <Label for="durasi_perjalanan">Durasi Perjalanan (menit)</Label>
        <Input
          id="durasi_perjalanan"
          v-model="durasi_perjalanan"
          type="number"
          min="1"
          max="1440"
          placeholder="Contoh: 60"
        />
        <p class="text-muted-foreground text-xs">Estimasi waktu tiba = waktu berangkat + durasi</p>
      </div>
    </div>

    <div class="space-y-2">
      <Label for="harga">Harga (Rp)</Label>
      <Input
        id="harga"
        v-model="harga"
        type="number"
        min="0"
        placeholder="Masukkan harga"
      />
    </div>
  </AdminFormLayout>
</template>
