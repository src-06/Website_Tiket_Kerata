<script setup lang="ts">
  import { ref, watch } from "vue"
  import { router, usePage } from "@inertiajs/vue3"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
  import { User, Mail, Phone, Lock, Save } from "@lucide/vue"
  import PageHeader from "@/components/PageHeader.vue"

  const props = defineProps<{
    user: {
      id_penumpang: number
      nama: string
      email: string
      no_hp: string
    }
  }>()

  const page = usePage()

  const nama = ref(props.user.nama)
  const email = ref(props.user.email)
  const no_hp = ref(props.user.no_hp)
  const password = ref("")
  const password_confirmation = ref("")
  const errors = ref<Record<string, string>>({})
  const processing = ref(false)
  const successMsg = ref("")
  const errorMsg = ref("")

  watch(
    () => page.props.errors,
    newErrors => {
      if (newErrors) {
        errors.value = { ...errors.value, ...newErrors }
      }
    },
    { immediate: true, deep: true }
  )

  function handleUpdate() {
    errors.value = {}
    processing.value = true

    if (!nama.value) errors.value.nama = "Nama harus diisi"
    if (!email.value) errors.value.email = "Email harus diisi"
    if (!no_hp.value) errors.value.no_hp = "No HP harus diisi"
    if (password.value && password.value.length < 8)
      errors.value.password = "Password minimal 8 karakter"
    if (password.value && password.value !== password_confirmation.value)
      errors.value.password_confirmation = "Konfirmasi password tidak cocok"

    if (Object.keys(errors.value).length > 0) {
      processing.value = false
      return
    }

    const payload: Record<string, string> = {
      nama: nama.value,
      email: email.value,
      no_hp: no_hp.value
    }

    if (password.value) {
      payload.password = password.value
      payload.password_confirmation = password_confirmation.value
    }

    router.put("/profile", payload, {
      onSuccess: () => {
        successMsg.value = "Profil berhasil diperbarui"
        errorMsg.value = ""
      },
      onFinish: () => {
        processing.value = false
        password.value = ""
        password_confirmation.value = ""
      }
    })
  }
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <PageHeader
      title="Profil Saya"
      description="Ubah data diri Anda"
    />

    <Card>
      <CardHeader>
        <CardTitle>Data Diri</CardTitle>
        <CardDescription>Perbarui informasi profil Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          class="space-y-4"
          @submit.prevent="handleUpdate"
        >
          <div class="space-y-2">
            <Label for="nama">Nama Lengkap</Label>
            <div class="relative">
              <User class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
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
              <Mail class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
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

          <div class="space-y-2">
            <Label for="password">Password Baru</Label>
            <div class="relative">
              <Lock class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="password"
                v-model="password"
                type="password"
                placeholder="Kosongkan jika tidak ingin mengubah"
                class="pl-9"
              />
            </div>
            <p
              v-if="errors.password"
              class="text-destructive text-xs"
            >
              {{ errors.password }}
            </p>
          </div>

          <div
            v-if="password"
            class="space-y-2"
          >
            <Label for="password_confirmation">Konfirmasi Password</Label>
            <div class="relative">
              <Lock class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="password_confirmation"
                v-model="password_confirmation"
                type="password"
                placeholder="Ulangi password"
                class="pl-9"
              />
            </div>
            <p
              v-if="errors.password_confirmation"
              class="text-destructive text-xs"
            >
              {{ errors.password_confirmation }}
            </p>
          </div>

          <Button
            type="submit"
            class="w-full cursor-pointer"
            size="lg"
            :disabled="processing"
          >
            <Save class="mr-2 size-4" />
            {{ processing ? "Menyimpan..." : "Simpan Perubahan" }}
          </Button>

          <p
            v-if="successMsg"
            class="text-center text-sm text-green-600"
          >
            {{ successMsg }}
          </p>
          <p
            v-if="errorMsg"
            class="text-center text-sm text-red-600"
          >
            {{ errorMsg }}
          </p>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
