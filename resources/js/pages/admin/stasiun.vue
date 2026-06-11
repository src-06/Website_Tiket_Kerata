<script setup lang="ts">
  import stasiunRoutes from "@/routes/stasiun"
  import { Link } from "@inertiajs/vue3"
  import { Button } from "@/components/ui/button"
  import { Plus, Pencil, Trash2, MapPin } from "@lucide/vue"
  import { useConfirmDelete } from "@/composables/useConfirmDelete"
  import PageHeader from "@/components/PageHeader.vue"
  import AdminListItem from "@/components/AdminListItem.vue"
  import EmptyState from "@/components/EmptyState.vue"
  import AppPagination from "@/components/AppPagination.vue"

  defineProps<{
    stasiuns: {
      data: {
        id_stasiun: number
        nama_stasiun: string
        kota: string
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

  const { hapus } = useConfirmDelete("stasiun")
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <PageHeader
      title="Daftar Stasiun"
      description="Kelola data stasiun kereta api"
    >
      <template #action>
        <Link :href="stasiunRoutes.create.url()">
          <Button class="cursor-pointer"><Plus class="mr-2 size-4" /> Tambah Stasiun</Button>
        </Link>
      </template>
    </PageHeader>

    <EmptyState
      v-if="stasiuns.data.length === 0"
      message="Belum ada data stasiun"
    />

    <div
      v-else
      class="space-y-3"
    >
      <AdminListItem
        v-for="s in stasiuns.data"
        :key="s.id_stasiun"
      >
        <template #icon><MapPin class="text-primary size-5" /></template>
        <template #content>
          <p class="font-medium">{{ s.nama_stasiun }}</p>
          <p class="text-muted-foreground text-sm">{{ s.kota }}</p>
        </template>
        <template #actions>
          <Link :href="stasiunRoutes.edit.url({ stasiun: s.id_stasiun })">
            <Button
              variant="outline"
              size="sm"
              class="cursor-pointer"
              ><Pencil class="size-4"
            /></Button>
          </Link>
          <form
            @submit.prevent="
              hapus(stasiunRoutes.destroy.url({ stasiun: s.id_stasiun }), s.nama_stasiun)
            "
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

    <AppPagination :meta="stasiuns.meta" />
  </div>
</template>
