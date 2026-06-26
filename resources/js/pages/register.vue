<script setup lang="ts">
  import { ref, watch } from "vue"
  import { router, usePage } from "@inertiajs/vue3"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
  import { Separator } from "@/components/ui/separator"
  import { User, Mail, Phone, Lock, Train } from "@lucide/vue"

  const page = usePage()

  const nama = ref("")
  const email = ref("")
  const no_hp = ref("")
  const password = ref("")
  const password_confirmation = ref("")
  const errors = ref<Record<string, string>>({})
  const processing = ref(false)

  watch(
    () => page.props.errors,
    newErrors => {
      if (newErrors) {
        errors.value = { ...errors.value, ...newErrors }
      }
    },
    { immediate: true, deep: true }
  )

  function handleRegister() {
    errors.value = {}
    processing.value = true

    if (!nama.value) errors.value.nama = "Nama harus diisi"
    if (!email.value) errors.value.email = "Email harus diisi"
    if (!no_hp.value) errors.value.no_hp = "No HP harus diisi"
    if (!password.value) errors.value.password = "Password harus diisi"
    else if (password.value.length < 8) errors.value.password = "Password minimal 8 karakter"
    if (password.value !== password_confirmation.value)
      errors.value.password_confirmation = "Konfirmasi password tidak cocok"

    if (Object.keys(errors.value).length > 0) {
      processing.value = false
      return
    }

    router.post(
      "/register",
      {
        nama: nama.value,
        email: email.value,
        no_hp: no_hp.value,
        password: password.value,
        password_confirmation: password_confirmation.value
      },
      {
        onFinish: () => {
          processing.value = false
        }
      }
    )
  }
</script>

<template>
  <div class="mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
    <Card class="w-full max-w-md">
      <CardHeader class="text-center">
      <div class="bg-primary/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
        <Train class="text-primary size-6" />
      </div>
      <CardTitle class="text-xl">Daftar</CardTitle>
      <CardDescription>Buat akun Tiket Kereta baru</CardDescription>
    </CardHeader>
    <CardContent>
      <form
        class="space-y-4"
        @submit.prevent="handleRegister"
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
            <Phone class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
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
          <Label for="password">Password</Label>
          <div class="relative">
            <Lock class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="Minimal 8 karakter"
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

        <div class="space-y-2">
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
          {{ processing ? "Memproses..." : "Daftar" }}
        </Button>

        <Separator />

        <p class="text-muted-foreground text-center text-sm">
          Sudah punya akun?
          <a
            href="/login"
            class="text-primary hover:underline"
          >Masuk</a>
        </p>
      </form>
    </CardContent>
    </Card>
  </div>
</template>
