<script setup lang="ts">
  import { computed } from "vue"
  import { usePage, Link } from "@inertiajs/vue3"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent } from "@/components/ui/card"
  import { Train, Clock, Shield, CreditCard, ArrowRight } from "@lucide/vue"
  import { showSearch } from "@/routes/jadwal"

  const page = usePage()
  const user = computed(() => page.props.auth?.user)

  const keunggulan = [
    { icon: Clock, title: "Cepat & Mudah", desc: "Pesan tiket dalam hitungan menit" },
    { icon: Shield, title: "Aman & Terpercaya", desc: "Data Anda terjamin keamanannya" },
    { icon: CreditCard, title: "Pembayaran Fleksibel", desc: "Berbagai metode pembayaran tersedia" }
  ]

  const stats = [
    { value: "50+", label: "Rute Tersedia" },
    { value: "1000+", label: "Tiket Terjual" },
    { value: "96%", label: "Pelanggan Puas" }
  ]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="border-b">
      <div class="mx-auto h-dvh max-w-6xl px-4 py-20 sm:py-28">
        <div class="text-center">
          <div
            class="bg-primary/10 mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl"
          >
            <Train class="text-primary size-7" />
          </div>
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Perjalanan Mudah dengan
            <span class="text-primary"> Tiket Kereta</span>
          </h1>
          <p class="text-muted-foreground mx-auto mt-6 max-w-lg text-lg">
            Pesan tiket kereta api secara online. Cepat, mudah, dan aman. Temukan jadwal
            keberangkatan favorit Anda.
          </p>
          <div class="mt-8 flex justify-center gap-4">
            <template v-if="user">
              <Button
                as-child
                size="lg"
                class="cursor-pointer px-8"
              >
                <Link :href="showSearch.url()">
                  Pesan Tiket Sekarang
                  <ArrowRight class="ml-2 size-4" />
                </Link>
              </Button>
            </template>
            <template v-else>
              <Button
                as-child
                size="lg"
                class="cursor-pointer px-8"
              >
                <Link href="/login"> Masuk </Link>
              </Button>
              <Button
                as-child
                variant="outline"
                size="lg"
                class="cursor-pointer px-8"
              >
                <Link href="/register"> Daftar </Link>
              </Button>
            </template>
          </div>
          <!-- Stats -->
          <div class="mx-auto mt-12 grid max-w-md grid-cols-3 gap-6">
            <div
              v-for="s in stats"
              :key="s.label"
            >
              <p class="text-2xl font-bold sm:text-3xl">{{ s.value }}</p>
              <p class="text-muted-foreground text-xs sm:text-sm">{{ s.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Keunggulan Section -->
    <section class="mx-auto flex h-dvh max-w-6xl items-center justify-center px-4 py-16">
      <div>
        <div class="mb-12 text-center">
          <h2 class="text-2xl font-bold sm:text-3xl">Mengapa Memilih Kami?</h2>
          <p class="text-muted-foreground mt-2">
            Kemudahan pemesanan tiket kereta dalam genggaman Anda
          </p>
        </div>
        <div class="grid gap-6 sm:grid-cols-3">
          <Card
            v-for="item in keunggulan"
            :key="item.title"
            class="text-center"
          >
            <CardContent class="pt-6">
              <div
                class="bg-primary/10 mx-auto mb-4 flex size-12 items-center justify-center rounded-full"
              >
                <component
                  :is="item.icon"
                  class="text-primary size-6"
                />
              </div>
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="text-muted-foreground mt-1 text-sm">{{ item.desc }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary/5 border-y">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center">
        <div>
          <h2 class="text-2xl font-bold sm:text-3xl">Siap Untuk Bepergian?</h2>
          <p class="text-muted-foreground mt-3">
            Pesan tiket kereta Anda sekarang dan nikmati perjalanan yang nyaman.
          </p>
          <div class="mt-8 flex justify-center gap-4">
            <template v-if="user">
              <Button
                as-child
                size="lg"
                class="cursor-pointer px-8"
              >
                <Link :href="showSearch.url()">
                  Pesan Tiket Sekarang
                  <ArrowRight class="ml-2 size-4" />
                </Link>
              </Button>
            </template>
            <template v-else>
              <Button
                as-child
                size="lg"
                class="cursor-pointer px-8"
              >
                <Link href="/login"> Masuk untuk Memesan </Link>
              </Button>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
