# Tiket Kereta

Aplikasi pemesanan tiket kereta api berbasis web menggunakan **Laravel 13** + **Vue 3** + **Inertia.js**.

## Fitur

- **Pencarian Jadwal** — Cari jadwal kereta berdasarkan stasiun asal, stasiun tujuan, dan tanggal
- **Pemesanan Tiket** — Pilih jadwal, isi data penumpang, dan lakukan pemesanan
- **Pembayaran** — Simulasi pembayaran tiket
- **Invoice** — Lihat detail pemesanan setelah pembayaran
- **Admin Panel** — CRUD untuk stasiun, kereta, jadwal, dan tiket (sidebar navigasi)

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

```bash
composer setup
```

Dan jalankan full-stack dev:

```bash
composer dev
```

## Testing & Code Quality

```bash
composer test       # PHP tests + lint + format
pnpm lint           # ESLint check
pnpm format:fix     # Prettier auto-fix
```

## Dev Commands

| Perintah                           | Kegunaan                                        |
| ---------------------------------- | ----------------------------------------------- |
| `composer dev`                     | Hot-reload full-stack                           |
| `php artisan migrate:fresh --seed` | Reset DB + seed (6 stasiun, 5 kereta, 7 jadwal) |

## Routes

| URL                   | Halaman               |
| --------------------- | --------------------- |
| `/`                   | Beranda / Cari Tiket  |
| `/jadwal/cari`        | Hasil Pencarian       |
| `/booking/{jadwal}`   | Form Pemesanan        |
| `/pembayaran/{tiket}` | Pembayaran            |
| `/invoice/{tiket}`    | Invoice               |
| `/tiket`              | Daftar Tiket          |
| `/jadwal`             | Daftar / CRUD Jadwal  |
| `/kereta`             | Daftar / CRUD Kereta  |
| `/stasiun`            | Daftar / CRUD Stasiun |

## Lisensi

MIT
