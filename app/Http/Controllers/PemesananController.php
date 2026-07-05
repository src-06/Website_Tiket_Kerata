<?php

namespace App\Http\Controllers;

use App\Models\DetailTiket;
use App\Models\Jadwal;
use App\Models\Tiket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PemesananController extends Controller
{
    public function formBooking(Request $request, Jadwal $jadwal)
    {
        $jadwal->load(['kereta', 'stasiunAsal', 'stasiunTujuan']);

        $kursiTerpakai = DetailTiket::whereHas('tiket', function ($q) use ($jadwal) {
            $q->where('id_jadwal', $jadwal->id_jadwal);
        })->pluck('nama_kursi')->toArray();

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
                'id_penumpang' => $request->user()->id_penumpang,
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
            'kursi' => 'required|array|min:1|max:4',
            'kursi.*' => 'required|string|max:3',
        ]);

        $jadwal = Jadwal::findOrFail($validated['id_jadwal']);

        $kursiTerpakai = DetailTiket::whereHas('tiket', function ($q) use ($jadwal) {
            $q->where('id_jadwal', $jadwal->id_jadwal);
        })->pluck('nama_kursi')->toArray();

        $terpakai = array_intersect($validated['kursi'], $kursiTerpakai);
        if (! empty($terpakai)) {
            return back()->withErrors(['kursi' => 'Kursi '.implode(', ', $terpakai).' sudah dipesan']);
        }

        $totalHarga = $jadwal->harga * count($validated['kursi']);

        return DB::transaction(function () use ($validated, $jadwal, $totalHarga, $request) {
            $tiket = Tiket::create([
                'id_jadwal' => $jadwal->id_jadwal,
                'total_harga' => $totalHarga,
                'status_pembayaran' => 'Belum Lunas',
            ]);

            foreach ($validated['kursi'] as $kursi) {
                DetailTiket::create([
                    'id_tiket' => $tiket->id_tiket,
                    'id_penumpang' => $request->user()->id_penumpang,
                    'nama_kursi' => $kursi,
                    'harga_satuan' => $jadwal->harga,
                ]);
            }

            return redirect()->route('pembayaran', $tiket->id_tiket);
        });
    }
}
