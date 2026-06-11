<script setup lang="ts">
  import { Train, Search, CalendarRange, Building2, Ticket } from "@lucide/vue"
  import { tiket, jadwal, kereta, stasiun } from "@/routes"
  import { home } from "@/routes"
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
  } from "@/components/ui/sidebar"
  import SidebarHeader from "./ui/sidebar/SidebarHeader.vue"
  import SidebarFooter from "./ui/sidebar/SidebarFooter.vue"
  import { Link } from "@inertiajs/vue3"
  import { useTheme } from "@/composables/useTheme"
  import { Moon, Sun } from "@lucide/vue"
  const { isDark, toggle } = useTheme()
</script>

<template>
  <Sidebar
    collapsible="icon"
    class="overflow-x-hidden"
  >
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            as-child
            size="lg"
            tooltip="Beranda"
          >
            <Link :href="home.url()">
              <div
                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
              >
                <Train class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-semibold">Tiket Kereta</span>
                <span class="text-xs">Website Pemesanan</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Pemesanan</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              as-child
              tooltip="Cari Tiket"
            >
              <Link :href="home.url()">
                <Search />
                <span>Cari Tiket</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarSeparator />
      <SidebarGroup>
        <SidebarGroupLabel>Data Master</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              as-child
              tooltip="Daftar Tiket"
            >
              <Link :href="tiket.url()">
                <Ticket />
                <span>Daftar Tiket</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              as-child
              tooltip="Daftar Jadwal"
            >
              <Link :href="jadwal.url()">
                <CalendarRange />
                <span>Daftar Jadwal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              as-child
              tooltip="Daftar Kereta"
            >
              <Link :href="kereta.url()">
                <Train />
                <span>Daftar Kereta</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              as-child
              tooltip="Daftar Stasiun"
            >
              <Link :href="stasiun.url()">
                <Building2 />
                <span>Daftar Stasiun</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Ganti tema"
            @click="toggle"
          >
            <Sun v-if="isDark" />
            <Moon v-else />
            <span>{{ isDark ? "Terang" : "Gelap" }}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
