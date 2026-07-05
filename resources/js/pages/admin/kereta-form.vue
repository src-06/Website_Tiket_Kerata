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
  import { Train } from "@lucide/vue"
  import AdminFormLayout from "@/components/AdminFormLayout.vue"

  const props = defineProps<{
    kereta?: {
      id_kereta: number
      nama_kereta: string
      kelas: string
    }
  }>()

  const isEdit = !!props.kereta
  const nama_kereta = ref(props.kereta?.nama_kereta ?? "")
  const kelas = ref(props.kereta?.kelas ?? "")

  function submit() {
    if (isEdit) {
      router.put(`/admin/kereta/${props.kereta!.id_kereta}`, {
        nama_kereta: nama_kereta.value,
        kelas: kelas.value
      })
    } else {
      router.post("/admin/kereta", {
        nama_kereta: nama_kereta.value,
        kelas: kelas.value
      })
    }
  }
</script>

<template>
  <AdminFormLayout
    :icon="Train"
    title="Kereta"
    back-url="/admin/kereta"
    :is-edit="isEdit"
    @submit="submit"
  >
    <div class="space-y-2">
      <Label for="nama_kereta">Nama Kereta</Label>
      <Input
        id="nama_kereta"
        v-model="nama_kereta"
        placeholder="Masukkan nama kereta"
      />
    </div>
    <div class="space-y-2">
      <Label for="kelas">Kelas</Label>
      <Select v-model="kelas">
        <SelectTrigger
          id="kelas"
          class="w-full"
        >
          <SelectValue placeholder="Pilih kelas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Eksekutif">Eksekutif</SelectItem>
          <SelectItem value="Bisnis">Bisnis</SelectItem>
          <SelectItem value="Ekonomi">Ekonomi</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </AdminFormLayout>
</template>
