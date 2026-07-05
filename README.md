# Tiket Kereta

Aplikasi pemesanan tiket kereta api berbasis web menggunakan **Laravel 13** + **Vue 3** + **Inertia.js**.

## Fitur

- **Pencarian Jadwal** — Cari jadwal kereta berdasarkan stasiun asal, stasiun tujuan, dan tanggal
- **Pemesanan Tiket** — Pilih jadwal, pilih hingga 4 kursi sekaligus, atur waktu berangkat sendiri (opsional)
- **Multi Penumpang** — 1 tiket bisa untuk maksimal 4 penumpang dengan kursi berbeda
- **Estimasi Waktu Tiba** — Waktu tiba dihitung otomatis berdasarkan durasi perjalanan
- **Pembayaran** — Simulasi pembayaran tiket (Transfer Bank, E-Wallet, QRIS)
- **Invoice** — Lihat detail pemesanan + cetak, tombol "Pesan Lagi" langsung ke rute yang sama
- **Tiket Saya** — Daftar tiket yang sudah dipesan
- **Admin Panel** — Dashboard, CRUD stasiun/kereta/jadwal, daftar tiket

## Database

### Schema

```
stasiun       → id_stasiun, nama_stasiun, kota
kereta        → id_kereta, nama_kereta, kelas
jadwal        → id_jadwal, id_kereta, id_stasiun_asal, id_stasiun_tujuan,
                waktu_berangkat, durasi_perjalanan (menit), harga
penumpang     → id_penumpang, nama, email, no_hp, password, role
tiket         → id_tiket, id_jadwal, total_harga, status_pembayaran,
                waktu_berangkat_custom (nullable)
detail_tiket  → id_detail_kursi, id_tiket, id_penumpang, nama_kursi, harga_satuan
pembayaran    → id_pembayaran, id_tiket, tanggal_bayar, metode_bayar, jumlah
```

### Relasi

```
Penumpang ──hasMany── DetailTiket ──belongsTo── Tiket ──belongsTo── Jadwal
Jadwal    ──belongsTo── Kereta
Jadwal    ──belongsTo── Stasiun (asal)
Jadwal    ──belongsTo── Stasiun (tujuan)
Tiket     ──hasOne── Pembayaran
```

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

## Seed Data

Jalankan untuk reset DB + seed sample data:

```bash
php artisan migrate:fresh --seed
```

| Data     | Jumlah | Keterangan                               |
| -------- | ------ | ---------------------------------------- |
| Stasiun  | 10     | Contoh: Gambir, Bandung, Surabaya, dll.  |
| Kereta   | 10     | Berbagai kelas (Eksekutif, Bisnis, etc.) |
| Jadwal   | 105    | 90 rute + 15 rute populer (2 jadwal)     |
| Tiket    | 0      | Dibuat saat user melakukan pemesanan      |

## Routes

### User

| URL                       | Halaman                    |
| ------------------------- | -------------------------- |
| `/`                       | Beranda / Cari Tiket       |
| `/jadwal/cari`            | Hasil Pencarian            |
| `/jadwal`                 | Daftar Jadwal              |
| `/booking/{jadwal}`       | Pilih Kursi & Jadwal       |
| `/pembayaran/{tiket}`     | Pembayaran                 |
| `/invoice/{tiket}`        | Invoice / E-Tiket          |
| `/tiket-saya`             | Tiket Saya                 |
| `/profile`                | Profil Penumpang           |

### Admin

| URL                         | Halaman               |
| --------------------------- | --------------------- |
| `/admin/dashboard`          | Dashboard             |
| `/admin/penumpang`          | Kelola Penumpang      |
| `/admin/tiket`              | Daftar Tiket          |
| `/admin/jadwal`             | CRUD Jadwal           |
| `/admin/jadwal/create`      | Tambah Jadwal         |
| `/admin/jadwal/{id}/edit`   | Edit Jadwal           |
| `/admin/kereta`             | CRUD Kereta           |
| `/admin/stasiun`            | CRUD Stasiun          |

## Dev Commands

| Perintah                           | Kegunaan                                              |
| ---------------------------------- | ----------------------------------------------------- |
| `composer dev`                     | Hot-reload full-stack                                 |
| `composer test`                    | PHP tests + lint + format                             |
| `php artisan migrate:fresh --seed` | Reset DB + seed (10 stasiun, 10 kereta, 105 jadwal)  |
| `php artisan wayfinder:generate`   | Regen typed JS route helpers                          |

## Lisensi

MIT
