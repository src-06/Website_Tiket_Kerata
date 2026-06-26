<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Tiket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PemesananController extends Controller
{
    public function formBooking(Request $request, Jadwal $jadwal)
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
            'user' => $request->user() ? [
                'nama' => $request->user()->nama,
                'email' => $request->user()->email,
                'no_hp' => $request->user()->no_hp,
            ] : null,
        ]);
    }

    public function simpanBooking(Request $request)
    {
        $validated = $request->validate([
            'id_jadwal' => 'required|exists:jadwal,id_jadwal',
            'kursi' => 'required|string|max:3',
        ]);

        $jadwal = Jadwal::findOrFail($validated['id_jadwal']);

        $kursiTerpakai = Tiket::where('id_jadwal', $jadwal->id_jadwal)
            ->pluck('kursi')
            ->toArray();

        if (in_array($validated['kursi'], $kursiTerpakai)) {
            return back()->withErrors(['kursi' => 'Kursi sudah dipesan']);
        }

        $tiket = Tiket::create([
            'id_penumpang' => $request->user()->id_penumpang,
            'id_jadwal' => $jadwal->id_jadwal,
            'kursi' => $validated['kursi'],
            'harga' => $jadwal->harga,
            'status_pembayaran' => 'Belum Lunas',
        ]);

        return redirect()->route('pembayaran', $tiket->id_tiket);
    }
}
