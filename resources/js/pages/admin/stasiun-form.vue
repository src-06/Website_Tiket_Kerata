<script setup lang="ts">
  import { ref } from "vue"
  import { router } from "@inertiajs/vue3"
  import stasiunRoutes from "@/routes/stasiun"
  import { stasiun as stasiunList } from "@/routes"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { MapPin } from "@lucide/vue"
  import AdminFormLayout from "@/components/AdminFormLayout.vue"

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
        kota: kota.value
      })
    } else {
      router.post(stasiunRoutes.store.url(), {
        nama_stasiun: nama_stasiun.value,
        kota: kota.value
      })
    }
  }
</script>

<template>
  <AdminFormLayout
    :icon="MapPin"
    title="Stasiun"
    :back-url="stasiunList.url()"
    :is-edit="isEdit"
    @submit="submit"
  >
    <div class="space-y-2">
      <Label for="nama_stasiun">Nama Stasiun</Label>
      <Input
        id="nama_stasiun"
        v-model="nama_stasiun"
        placeholder="Masukkan nama stasiun"
      />
    </div>
    <div class="space-y-2">
      <Label for="kota">Kota</Label>
      <Input
        id="kota"
        v-model="kota"
        placeholder="Masukkan kota"
      />
    </div>
  </AdminFormLayout>
</template>
