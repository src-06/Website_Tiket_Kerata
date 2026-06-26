<script setup lang="ts">
  import { ref, watch } from "vue"
  import { router, usePage } from "@inertiajs/vue3"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
  import { Separator } from "@/components/ui/separator"
  import { Mail, Lock, Train } from "@lucide/vue"

  const page = usePage()

  const email = ref("")
  const password = ref("")
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

  function handleLogin() {
    errors.value = {}
    processing.value = true

    if (!email.value) errors.value.email = "Email harus diisi"
    if (!password.value) errors.value.password = "Password harus diisi"

    if (Object.keys(errors.value).length > 0) {
      processing.value = false
      return
    }

    router.post(
      "/login",
      {
        email: email.value,
        password: password.value
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
        <CardTitle class="text-xl">Masuk</CardTitle>
        <CardDescription>Masuk ke akun Tiket Kereta Anda</CardDescription>
      </CardHeader>
    <CardContent>
      <form
        class="space-y-4"
        @submit.prevent="handleLogin"
      >
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
          <Label for="password">Password</Label>
          <div class="relative">
            <Lock class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="Masukkan password"
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

        <Button
          type="submit"
          class="w-full cursor-pointer"
          size="lg"
          :disabled="processing"
        >
          {{ processing ? "Memproses..." : "Masuk" }}
        </Button>

        <Separator />

        <p class="text-muted-foreground text-center text-sm">
          Belum punya akun?
          <a
            href="/register"
            class="text-primary hover:underline"
          >Daftar</a>
        </p>
      </form>
    </CardContent>
    </Card>
  </div>
</template>
