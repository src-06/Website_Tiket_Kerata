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
    return Inertia::render('home', [
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
      'jadwals' => $jadwals,
      'stasiunAsal' => Stasiun::find($validated['asal']),
      'stasiunTujuan' => Stasiun::find($validated['tujuan']),
    ]);
  }
}
