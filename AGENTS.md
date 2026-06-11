# Tiket Kereta — Agent Guide

## Dev Commands

| Command | What |
|---------|------|
| `composer dev` | Full-stack hot-reload (artisan serve + queue + pail + vite) |
| `composer test` | PHP tests → `pnpm lint` → `pnpm format` (unified gate) |
| `pnpm dev` | Vite dev server only |
| `pnpm build` | Vite production build |
| `pnpm lint` / `pnpm format` | ESLint / Prettier (check only) |
| `pnpm lint:fix` / `pnpm format:fix` | Auto-fix |
| `php artisan migrate:fresh --seed` | Reset DB + seed sample data (6 stasiun, 5 kereta, 7 jadwal) |
| `php artisan wayfinder:generate` | Regen typed JS route helpers (auto-runs on `pnpm dev`) |

No `typecheck` or `codegen` scripts. Editor handles `vue-tsc`.

## Stack

- **Laravel 13** / **PHP ^8.3** — backend, routes in `routes/web.php`
- **Vue 3.5** + **Inertia.js 3** — SPA, pages in `resources/js/pages/`
- **shadcn-vue** (New York, neutral) — UI components in `resources/js/components/ui/`
- **Tailwind v4** — no config file, uses `@tailwindcss/vite` plugin
- **pnpm** — package manager; `.npmrc` has `ignore-scripts=true`

## Key Architecture

- **No auth** — guest checkout flow. User model exists but unused.
- **Custom PKs**: `id_stasiun`, `id_kereta`, `id_jadwal`, etc. Model `$table`/`$primaryKey` set explicitly.
- **SQLite** — `database/database.sqlite`. Testing uses `:memory:`.
- **Wayfinder** — generates `resources/js/routes/` and `resources/js/wayfinder/` (gitignored, ESLint-ignored). Import helpers like `import { form } from '@/routes/booking'` instead of using `route()`.

## Pages & Routes

| Route | Page | Controller |
|-------|------|------------|
| `/` | `home.vue` | BookingController |
| `/jadwal/cari` | `jadwal.vue` | BookingController |
| `/booking/{jadwal}` | `booking.vue` | BookingController |
| `/pembayaran/{tiket}` | `pembayaran.vue` | BookingController |
| `/invoice/{tiket}` | `invoice.vue` | BookingController |
| `/admin/*` | `admin/*.vue` (7 pages) | AdminController |

## Adding shadcn-vue Components

```bash
pnpm dlx shadcn-vue@latest add <name> --yes
```

Already installed: badge, button, card, input, label, select, separator, sheet, sidebar, skeleton, tooltip.

## Code Conventions

- **Prettier**: no semis, double quotes, printWidth 100, Tailwind class sorting
- **ESLint**: flat config, `vue/multi-word-component-names: off`, `@typescript-eslint/no-explicit-any: warn`
- **Vue**: `<script setup lang="ts">`, Composition API
- **PHP**: Laravel conventions, form requests validated inline in controllers
- **Delete actions**: Use `$inertia.delete(url)` in templates (Inertia v3 injects `$inertia` globally)

## Database Models & Relationships

```
Stasiun ──┬── Jadwal (stasiun_asal)
           └── Jadwal (stasiun_tujuan)
Kereta  ──── Jadwal
Jadwal  ──── Tiket
Penumpang ── Tiket
Tiket   ──── Pembayaran (hasOne)
```

## Notes

- `Session|Cache|Queue` all use database driver (SQLite tables exist)
- `tw-animate-css` provides CSS animations, imported in `app.css`
- Dark mode via `.dark` class on parent
- Montserrat font auto-loaded by `laravel-vite-plugin/fonts`
