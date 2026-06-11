<script setup lang="ts">
  import { Link } from "@inertiajs/vue3"
  import { Button } from "@/components/ui/button"
  import { ChevronLeft, ChevronRight } from "@lucide/vue"

  defineProps<{
    meta: {
      current_page: number
      last_page: number
      from: number | null
      to: number | null
      total: number
      links: {
        url: string | null
        label: string
        active: boolean
      }[]
    }
  }>()
</script>

<template>
  <div
    v-if="meta.last_page > 1"
    class="mt-6 flex flex-col items-center gap-3"
  >
    <p class="text-muted-foreground text-xs">
      Menampilkan {{ meta.from }}–{{ meta.to }} dari {{ meta.total }}
    </p>
    <div class="flex items-center gap-1">
      <Link
        v-if="meta.links[0]?.url"
        :href="meta.links[0].url"
      >
        <Button
          variant="outline"
          size="sm"
          class="cursor-pointer"
        >
          <ChevronLeft class="size-4" />
        </Button>
      </Link>
      <template
        v-for="(link, i) in meta.links"
        :key="i"
      >
        <Link
          v-if="link.url && i > 0 && i < meta.links.length - 1"
          :href="link.url"
        >
          <Button
            variant="ghost"
            size="sm"
            class="min-w-9 cursor-pointer"
            :class="link.active ? 'bg-primary text-primary-foreground hover:bg-primary' : ''"
          >
            <span v-html="link.label" />
          </Button>
        </Link>
        <span
          v-else-if="!link.url && i > 0 && i < meta.links.length - 1"
          class="text-muted-foreground px-2 text-xs"
          >...</span
        >
      </template>
      <Link
        v-if="meta.links[meta.links.length - 1]?.url"
        :href="meta.links[meta.links.length - 1].url"
      >
        <Button
          variant="outline"
          size="sm"
          class="cursor-pointer"
        >
          <ChevronRight class="size-4" />
        </Button>
      </Link>
    </div>
  </div>
</template>
