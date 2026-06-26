<script setup lang="ts">
  import admin from "@/layouts/admin.vue"
  import { Link } from "@inertiajs/vue3"

  defineOptions({ layout: admin })

  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
  import { Plus, Pencil, Trash2, Train } from "@lucide/vue"
  import { useConfirmDelete } from "@/composables/useConfirmDelete"
  import PageHeader from "@/components/PageHeader.vue"
  import AdminListItem from "@/components/AdminListItem.vue"
  import EmptyState from "@/components/EmptyState.vue"
  import AppPagination from "@/components/AppPagination.vue"

  defineProps<{
    keretas: {
      data: {
        id_kereta: number
        nama_kereta: string
        kelas: string
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

  const { hapus } = useConfirmDelete("kereta")
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <PageHeader
      title="Daftar Kereta"
      description="Kelola data kereta api"
    >
      <template #action>
        <Link href="/admin/kereta/create">
          <Button class="cursor-pointer"><Plus class="mr-2 size-4" /> Tambah Kereta</Button>
        </Link>
      </template>
    </PageHeader>

    <EmptyState
      v-if="keretas.data.length === 0"
      message="Belum ada data kereta"
    />

    <div
      v-else
      class="space-y-3"
    >
      <AdminListItem
        v-for="k in keretas.data"
        :key="k.id_kereta"
      >
        <template #icon><Train class="text-primary size-5" /></template>
        <template #content>
          <p class="font-medium">{{ k.nama_kereta }}</p>
          <Badge
            variant="secondary"
            class="mt-1"
            >{{ k.kelas }}</Badge
          >
        </template>
        <template #actions>
          <Link :href="`/admin/kereta/${k.id_kereta}/edit`">
            <Button
              variant="outline"
              size="sm"
              class="cursor-pointer"
              ><Pencil class="size-4"
            /></Button>
          </Link>
          <form
            @submit.prevent="hapus(`/admin/kereta/${k.id_kereta}`, k.nama_kereta)"
          >
            <Button
              variant="destructive"
              size="sm"
              class="cursor-pointer"
              type="submit"
            >
              <Trash2 class="size-4" />
            </Button>
          </form>
        </template>
      </AdminListItem>
    </div>

    <AppPagination :meta="keretas.meta" />
  </div>
</template>
