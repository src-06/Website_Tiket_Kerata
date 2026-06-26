<script setup lang="ts">
  import { computed } from "vue"
  import { usePage, router } from "@inertiajs/vue3"
  import { Train, Search, Ticket, LogOut, LogIn, UserPlus, LayoutDashboard, CalendarRange } from "@lucide/vue"
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
  const isAdmin = computed(() => user.value?.role === "admin")

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
      <SidebarGroup v-if="user">
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              as-child
              tooltip="Daftar Jadwal"
            >
              <Link href="/jadwal">
                <CalendarRange />
                <span>Daftar Jadwal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              as-child
              tooltip="Tiket Saya"
            >
              <Link href="/tiket-saya">
                <Ticket />
                <span>Tiket Saya</span>
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
              <DropdownMenuItem
                v-if="isAdmin"
                as-child
              >
                <Link href="/admin/dashboard">
                  <LayoutDashboard class="mr-2 size-4" />
                  <span>Dashboard Admin</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem @click="logout">
                <LogOut class="mr-2 size-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
        <SidebarMenuItem v-else>
          <SidebarMenuButton
            as-child
            tooltip="Masuk"
          >
            <Link href="/login">
              <LogIn />
              <span>Masuk</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem v-if="!user">
          <SidebarMenuButton
            as-child
            tooltip="Daftar"
          >
            <Link href="/register">
              <UserPlus />
              <span>Daftar</span>
            </Link>
          </SidebarMenuButton>
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
