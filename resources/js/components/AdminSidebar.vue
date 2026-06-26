<script setup lang="ts">
  import { computed } from "vue"
  import { usePage, router } from "@inertiajs/vue3"
  import {
    Train,
    CalendarRange,
    Building2,
    Ticket,
    LogOut,
    LayoutDashboard,
    Users
  } from "@lucide/vue"
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
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu"
  import { Avatar, AvatarFallback } from "@/components/ui/avatar"

  const { isDark, toggle } = useTheme()
  const page = usePage()
  const user = computed(() => page.props.auth?.user)

  function logout() {
    router.post("/logout")
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
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
            tooltip="Admin Panel"
          >
            <Link href="/admin/dashboard">
              <div
                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
              >
                <Train class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-semibold">Admin Panel</span>
                <span class="text-xs">Tiket Kereta</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              as-child
              tooltip="Dashboard"
            >
              <Link href="/admin/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
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
              tooltip="Daftar Penumpang"
            >
              <Link href="/admin/penumpang">
                <Users />
                <span>Daftar Penumpang</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              as-child
              tooltip="Daftar Tiket"
            >
              <Link href="/admin/tiket">
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
              <Link href="/admin/jadwal">
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
              <Link href="/admin/kereta">
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
              <Link href="/admin/stasiun">
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
        <SidebarMenuItem v-if="user">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton
                size="lg"
                tooltip="Profil"
              >
                <Avatar class="size-8">
                  <AvatarFallback class="bg-primary/10 text-primary text-xs font-semibold">
                    {{ getInitials(user.nama) }}
                  </AvatarFallback>
                </Avatar>
                <div class="flex flex-col gap-0.5 leading-none text-left">
                  <span class="font-medium">{{ user.nama }}</span>
                  <span class="text-muted-foreground text-xs">{{ user.email }}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              class="w-56"
            >
              <DropdownMenuLabel>
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium">{{ user.nama }}</p>
                  <p class="text-muted-foreground text-xs">{{ user.email }}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="logout">
                <LogOut class="mr-2 size-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
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
