<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Stasiun;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PencarianController extends Controller
{
    public function home()
    {
        return Inertia::render('home');
    }

    public function showSearch()
    {
        return Inertia::render('cari', [
            'stasiuns' => Stasiun::orderBy('kota')->get(),
        ]);
    }

    public function cariJadwal(Request $request)
    {
        $validated = $request->validate([
            'asal' => 'required|exists:stasiun,id_stasiun',
            'tujuan' => 'required|exists:stasiun,id_stasiun|different:asal',
        ]);

        $jadwals = Jadwal::with(['kereta', 'stasiunAsal', 'stasiunTujuan'])
            ->where('id_stasiun_asal', $validated['asal'])
            ->where('id_stasiun_tujuan', $validated['tujuan'])
            ->whereDate('waktu_berangkat', '>=', today())
            ->orderBy('waktu_berangkat')
            ->get();

        return Inertia::render('jadwal', [
            'jadwals' => [
                'data' => $jadwals,
                'meta' => [
                    'current_page' => 1,
                    'last_page' => 1,
                    'from' => $jadwals->isNotEmpty() ? 1 : null,
                    'to' => $jadwals->count(),
                    'total' => $jadwals->count(),
                    'links' => [],
                ],
            ],
            'stasiunAsal' => Stasiun::find($validated['asal']),
            'stasiunTujuan' => Stasiun::find($validated['tujuan']),
        ]);
    }
}
