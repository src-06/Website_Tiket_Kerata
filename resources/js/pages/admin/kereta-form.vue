<script setup lang="ts">
import { ref } from "vue"
import { Link, router } from "@inertiajs/vue3"
import keretaRoutes from "@/routes/kereta"
import { kereta as keretaList } from "@/routes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Train } from "@lucide/vue"

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
    router.put(keretaRoutes.update.url({ kereta: props.kereta!.id_kereta }), {
      nama_kereta: nama_kereta.value,
      kelas: kelas.value,
    })
  } else {
    router.post(keretaRoutes.store.url(), {
      nama_kereta: nama_kereta.value,
      kelas: kelas.value,
    })
  }
}
</script>

<template>
  <div class="mx-auto max-w-lg px-4 py-8">
    <Link :href="keretaList.url()" class="text-muted-foreground hover:text-primary mb-4 inline-flex items-center gap-1 text-sm">
      <ArrowLeft class="size-4" /> Kembali
    </Link>

    <Card>
      <CardHeader>
        <div class="flex items-center gap-2">
          <Train class="size-5" />
          <CardTitle>{{ isEdit ? "Edit Kereta" : "Tambah Kereta" }}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="submit" class="space-y-4">
          <div class="space-y-2">
            <Label for="nama_kereta">Nama Kereta</Label>
            <Input id="nama_kereta" v-model="nama_kereta" placeholder="Masukkan nama kereta" />
          </div>
          <div class="space-y-2">
            <Label for="kelas">Kelas</Label>
            <Select v-model="kelas">
              <SelectTrigger id="kelas" class="w-full">
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Eksekutif">Eksekutif</SelectItem>
                <SelectItem value="Bisnis">Bisnis</SelectItem>
                <SelectItem value="Ekonomi">Ekonomi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex justify-end gap-3">
            <Link :href="keretaList.url()">
              <Button type="button" variant="outline" class="cursor-pointer">Batal</Button>
            </Link>
            <Button type="submit" class="cursor-pointer">{{ isEdit ? "Simpan Perubahan" : "Simpan" }}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
