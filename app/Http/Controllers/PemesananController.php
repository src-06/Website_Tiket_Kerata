<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Penumpang;
use App\Models\Tiket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PemesananController extends Controller
{
    public function formBooking(Jadwal $jadwal)
    {
        $jadwal->load(['kereta', 'stasiunAsal', 'stasiunTujuan']);

        $kursiTerpakai = Tiket::where('id_jadwal', $jadwal->id_jadwal)
            ->pluck('kursi')
            ->toArray();

        $semuaKursi = [];
        $baris = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        foreach ($baris as $b) {
            for ($i = 1; $i <= 8; $i++) {
                $semuaKursi[] = $b.$i;
            }
        }

        return Inertia::render('booking', [
            'jadwal' => $jadwal,
            'kursiTerpakai' => $kursiTerpakai,
            'semuaKursi' => $semuaKursi,
        ]);
    }

    public function simpanBooking(Request $request)
    {
        $validated = $request->validate([
            'id_jadwal' => 'required|exists:jadwal,id_jadwal',
            'nama' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'no_hp' => 'required|string|max:20',
            'kursi' => 'required|string|max:3',
        ]);

        $jadwal = Jadwal::findOrFail($validated['id_jadwal']);

        $kursiTerpakai = Tiket::where('id_jadwal', $jadwal->id_jadwal)
            ->pluck('kursi')
            ->toArray();

        if (in_array($validated['kursi'], $kursiTerpakai)) {
            return back()->withErrors(['kursi' => 'Kursi sudah dipesan']);
        }

        DB::transaction(function () use ($validated, $jadwal, &$tiket) {
            $penumpang = Penumpang::create([
                'nama' => $validated['nama'],
                'email' => $validated['email'],
                'no_hp' => $validated['no_hp'],
            ]);

            $tiket = Tiket::create([
                'id_penumpang' => $penumpang->id_penumpang,
                'id_jadwal' => $jadwal->id_jadwal,
                'kursi' => $validated['kursi'],
                'harga' => $jadwal->harga,
                'status_pembayaran' => 'Belum Lunas',
            ]);
        });

        return redirect()->route('pembayaran', $tiket->id_tiket);
    }
}
