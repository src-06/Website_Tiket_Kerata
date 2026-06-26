<script setup lang="ts">
  import admin from "@/layouts/admin.vue"
  import { router } from "@inertiajs/vue3"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Users, Search, Mail, Phone, Shield, UserCog } from "@lucide/vue"
  import { ref, computed } from "vue"
  import PageHeader from "@/components/PageHeader.vue"
  import AdminListItem from "@/components/AdminListItem.vue"
  import EmptyState from "@/components/EmptyState.vue"
  import AppPagination from "@/components/AppPagination.vue"

  defineOptions({ layout: admin })

  const props = defineProps<{
    penumpangs: {
      data: {
        id_penumpang: number
        nama: string
        email: string
        no_hp: string
        role: string
        created_at: string
      }[]
      meta: {
        current_page: number
        last_page: number
        from: number | null
        to: number | null
        total: number
        links: { url: string | null; label: string; active: boolean }[]
      }
    }
  }>()

  const search = ref("")

  const filtered = computed(() => {
    if (!search.value) return props.penumpangs.data
    const q = search.value.toLowerCase()
    return props.penumpangs.data.filter(
      p =>
        p.nama.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.no_hp.includes(q)
    )
  })

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  }

  function toggleRole(p: { id_penumpang: number; role: string }) {
    const newRole = p.role === "admin" ? "user" : "admin"
    if (!confirm(`Ubah role ${p.nama} menjadi ${newRole}?`)) return
    router.put(`/admin/penumpang/${p.id_penumpang}/role`, { role: newRole })
  }
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <PageHeader
      title="Daftar Penumpang"
      description="Semua data penumpang yang terdaftar"
    >
      <template #action>
        <div class="relative w-64">
          <Search class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            v-model="search"
            placeholder="Cari penumpang..."
            class="pl-9"
          />
        </div>
      </template>
    </PageHeader>

    <EmptyState
      v-if="filtered.length === 0"
      message="Tidak ada data penumpang"
    />

    <div
      v-else
      class="space-y-3"
    >
      <AdminListItem
        v-for="p in filtered"
        :key="p.id_penumpang"
        class="hover:bg-accent/50 transition-colors"
      >
        <template #icon><Users class="text-primary size-5" /></template>
        <template #content>
          <div class="flex items-center gap-2">
            <span class="font-medium">{{ p.nama }}</span>
            <Badge
              :variant="p.role === 'admin' ? 'default' : 'secondary'"
              :class="p.role === 'admin' ? 'bg-blue-500' : ''"
            >
              <Shield class="mr-1 size-3" />
              {{ p.role }}
            </Badge>
          </div>
          <div
            class="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs"
          >
            <span class="flex items-center gap-1"
              ><Mail class="size-3" /> {{ p.email }}</span
            >
            <span class="flex items-center gap-1"
              ><Phone class="size-3" /> {{ p.no_hp }}</span
            >
            <span>Terdaftar {{ formatDate(p.created_at) }}</span>
          </div>
        </template>
        <template #actions>
          <Button
            variant="outline"
            size="sm"
            class="cursor-pointer"
            @click="toggleRole(p)"
          >
            <UserCog class="mr-1 size-4" />
            {{ p.role === "admin" ? "Jadikan User" : "Jadikan Admin" }}
          </Button>
        </template>
      </AdminListItem>
    </div>

    <AppPagination :meta="penumpangs.meta" />
  </div>
</template>
