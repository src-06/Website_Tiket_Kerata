<script setup lang="ts">
import { ref } from "vue"
import { Link, router } from "@inertiajs/vue3"
import stasiunRoutes from "@/routes/stasiun"
import { stasiun as stasiunList } from "@/routes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin } from "@lucide/vue"

const props = defineProps<{
  stasiun?: {
    id_stasiun: number
    nama_stasiun: string
    kota: string
  }
}>()

const isEdit = !!props.stasiun
const nama_stasiun = ref(props.stasiun?.nama_stasiun ?? "")
const kota = ref(props.stasiun?.kota ?? "")

function submit() {
  if (isEdit) {
    router.put(stasiunRoutes.update.url({ stasiun: props.stasiun!.id_stasiun }), {
      nama_stasiun: nama_stasiun.value,
      kota: kota.value,
    })
  } else {
    router.post(stasiunRoutes.store.url(), {
      nama_stasiun: nama_stasiun.value,
      kota: kota.value,
    })
  }
}
</script>

<template>
  <div class="mx-auto max-w-lg px-4 py-8">
    <Link :href="stasiunList.url()" class="text-muted-foreground hover:text-primary mb-4 inline-flex items-center gap-1 text-sm">
      <ArrowLeft class="size-4" /> Kembali
    </Link>

    <Card>
      <CardHeader>
        <div class="flex items-center gap-2">
          <MapPin class="size-5" />
          <CardTitle>{{ isEdit ? "Edit Stasiun" : "Tambah Stasiun" }}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="submit" class="space-y-4">
          <div class="space-y-2">
            <Label for="nama_stasiun">Nama Stasiun</Label>
            <Input id="nama_stasiun" v-model="nama_stasiun" placeholder="Masukkan nama stasiun" />
          </div>
          <div class="space-y-2">
            <Label for="kota">Kota</Label>
            <Input id="kota" v-model="kota" placeholder="Masukkan kota" />
          </div>
          <div class="flex justify-end gap-3">
            <Link :href="stasiunList.url()">
              <Button type="button" variant="outline" class="cursor-pointer">Batal</Button>
            </Link>
            <Button type="submit" class="cursor-pointer">{{ isEdit ? "Simpan Perubahan" : "Simpan" }}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
