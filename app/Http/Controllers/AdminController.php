<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Kereta;
use App\Models\Penumpang;
use App\Models\Stasiun;
use App\Models\Tiket;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'tiket' => Tiket::count(),
            'jadwal' => Jadwal::count(),
            'kereta' => Kereta::count(),
            'stasiun' => Stasiun::count(),
            'penumpang' => Penumpang::count(),
            'pendapatan' => (float) Tiket::where('status_pembayaran', 'Lunas')->sum('harga'),
        ];

        $tiketTerbaru = Tiket::with(['penumpang', 'jadwal.kereta'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($t) => [
                'id_tiket' => $t->id_tiket,
                'kursi' => $t->kursi,
                'harga' => $t->harga,
                'status_pembayaran' => $t->status_pembayaran,
                'penumpang' => ['nama' => $t->penumpang->nama],
                'kereta' => ['nama_kereta' => $t->jadwal->kereta->nama_kereta],
            ]);

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'tiketTerbaru' => $tiketTerbaru,
        ]);
    }
}
