# Tiket Kereta

Aplikasi pemesanan tiket kereta api berbasis web menggunakan **Laravel 13** + **Vue 3.5** + **Inertia.js 3**.

## Fitur

- **Pencarian Jadwal** — Cari jadwal kereta berdasarkan stasiun asal, stasiun tujuan, dan tanggal
- **Pemesanan Tiket** — Pilih jadwal, pilih hingga 4 kursi sekaligus, atur waktu berangkat sendiri (opsional)
- **Multi Penumpang** — 1 tiket bisa untuk maksimal 4 penumpang dengan kursi berbeda
- **Estimasi Waktu Tiba** — Waktu tiba dihitung otomatis berdasarkan durasi perjalanan
- **Pembayaran** — Simulasi pembayaran tiket (Transfer Bank, E-Wallet, QRIS)
- **Invoice** — Lihat detail pemesanan + cetak, tombol "Pesan Lagi" langsung ke rute yang sama
- **Tiket Saya** — Daftar tiket yang sudah dipesan
- **Profil** — Kelola data penumpang
- **Admin Panel** — Dashboard statistik, CRUD stasiun/kereta/jadwal, kelola penumpang & tiket

## Stack

| Lapisan         | Teknologi                                   |
| --------------- | ------------------------------------------- |
| Backend         | Laravel 13, PHP ^8.3, SQLite                |
| Frontend        | Vue 3.5 (Composition API, `<script setup>`) |
| SPA Framework   | Inertia.js v3                               |
| UI Components   | shadcn-vue (New York, neutral)              |
| CSS             | Tailwind v4 + tw-animate-css                |
| Package Manager | pnpm                                        |

## Setup

Install dependencies dan setup project:

```bash
composer setup
```

Jalankan full-stack development server:

```bash
composer dev
```

## Dev Commands

| Perintah                           | Kegunaan                                            |
| ---------------------------------- | --------------------------------------------------- |
| `composer dev`                     | Hot-reload full-stack (serve + queue + pail + vite) |
| `composer test`                    | PHP tests + ESLint + Prettier (unified gate)        |
| `pnpm dev`                         | Vite dev server only                                |
| `pnpm build`                       | Vite production build                               |
| `pnpm lint` / `pnpm lint:fix`      | ESLint check / auto-fix                             |
| `pnpm format` / `pnpm format:fix`  | Prettier check / auto-fix                           |
| `php artisan migrate:fresh --seed` | Reset DB + seed data                                |
| `php artisan wayfinder:generate`   | Regenerate typed JS route helpers                   |

## Seed Data & Akun Demo

```bash
php artisan migrate:fresh --seed
```

| Data      | Jumlah | Keterangan                               |
| --------- | ------ | ---------------------------------------- |
| Stasiun   | 10     | Contoh: Gambir, Bandung, Surabaya, dll.  |
| Kereta    | 10     | Berbagai kelas (Eksekutif, Bisnis, etc.) |
| Jadwal    | ~105   | 90 rute + 15 rute populer (2 jadwal)     |
| Penumpang | 2      | Admin + User (lihat tabel akun di bawah) |

| Email               | Password   | Role  |
| ------------------- | ---------- | ----- |
| `admin@example.com` | `password` | admin |
| `user@example.com`  | `password` | user  |

## Routes

### Public

| Route       | Page           | Controller          |
| ----------- | -------------- | ------------------- |
| `/`         | `home.vue`     | PencarianController |
| `/login`    | `login.vue`    | AuthController      |
| `/register` | `register.vue` | AuthController      |

### Auth Required

| Route                 | Page             | Controller           |
| --------------------- | ---------------- | -------------------- |
| `/jadwal/cari`        | `cari.vue`       | PencarianController  |
| Post `/jadwal/cari`   | `jadwal.vue`     | PencarianController  |
| `/jadwal`             | `jadwal.vue`     | JadwalController     |
| `/booking/{jadwal}`   | `booking.vue`    | PemesananController  |
| `/pembayaran/{tiket}` | `pembayaran.vue` | PembayaranController |
| `/invoice/{tiket}`    | `invoice.vue`    | InvoiceController    |
| `/tiket-saya`         | `tiket-saya.vue` | TiketController      |
| `/profile`            | `profile.vue`    | ProfileController    |

### Admin (`middleware(['auth', 'admin'])`)

| Route              | Page                       | Controller          |
| ------------------ | -------------------------- | ------------------- |
| `/admin/dashboard` | `admin/dashboard.vue`      | AdminController     |
| `/admin/penumpang` | `admin/penumpang.vue`      | PenumpangController |
| `/admin/tiket`     | `admin/tiket.vue`          | TiketController     |
| `/admin/jadwal`    | `admin/jadwal.vue` + form  | JadwalController    |
| `/admin/kereta`    | `admin/kereta.vue` + form  | KeretaController    |
| `/admin/stasiun`   | `admin/stasiun.vue` + form | StasiunController   |

## Arsitektur

### Layouts

- **`default.vue`** — Sidebar navigasi user
- **`admin.vue`** — Sidebar navigasi admin (digunakan dengan `defineOptions({ layout: admin })`)

### Autentikasi

- Session-based, menggunakan model `Penumpang` sebagai guard utama
- Roles: `admin` / `user` via `App\Enums\Role`
- Shared prop `auth.user` melalui `HandleInertiaRequests` middleware

### Kunci Utama (Primary Keys)

Menggunakan custom naming: `id_stasiun`, `id_kereta`, `id_jadwal`, `id_tiket`, `id_penumpang`, `id_detail_tiket`

### Relasi Database

```
Stasiun ──┬── Jadwal (stasiun_asal)
          └── Jadwal (stasiun_tujuan)
Kereta  ──── Jadwal
Jadwal  ──── Tiket
Tiket   ──┬── DetailTiket ── Penumpang
          └── Pembayaran (hasOne)
```

### Wayfinder Route Helpers

Import rute dari `@/actions/` atau `@/routes/` untuk type-safe routing ketimbang hardcode URL:

```ts
import { showSearch } from "@/routes/jadwal"
// atau
import { index } from "@/actions/PemesananController"
```

### Informasi Kursi

- Layout kereta: **7 baris (A–G) × 8 kolom (1–8) = 56 kursi**
- Maksimal **4 kursi** per pemesanan
- Format nama kursi: `A1`, `B3`, `G8`, dll.

### Pembayaran

Pembayaran bersifat simulasi (tidak terhubung ke gateway pembayaran nyata). Metode yang tersedia: Transfer Bank, E-Wallet (OVO/DANA/GoPay), QRIS.

## Code Conventions

- **Vue**: `<script setup lang="ts">`, Composition API
- **PHP**: Constructor property promotion, return type declarations
- **Prettier**: no semis, double quotes, printWidth 100, Tailwind class sorting
- **ESLint**: flat config, `@typescript-eslint/no-explicit-any: warn`

## Lisensi

MIT
