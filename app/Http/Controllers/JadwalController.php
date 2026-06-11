<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Kereta;
use App\Models\Stasiun;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JadwalController extends Controller
{
  public function index()
  {
    $jadwals = Jadwal::with(['kereta', 'stasiunAsal', 'stasiunTujuan'])
      ->latest()
      ->get();

    return Inertia::render('admin/jadwal', [
      'jadwals' => $jadwals,
    ]);
  }

  public function create()
  {
    return Inertia::render('admin/jadwal-form', [
      'keretas' => Kereta::all(),
      'stasiuns' => Stasiun::all(),
    ]);
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'id_kereta' => 'required|exists:kereta,id_kereta',
      'id_stasiun_asal' => 'required|exists:stasiun,id_stasiun',
      'id_stasiun_tujuan' => 'required|exists:stasiun,id_stasiun|different:id_stasiun_asal',
      'waktu_berangkat' => 'required|date',
      'waktu_tiba' => 'required|date|after:waktu_berangkat',
      'harga' => 'required|integer|min:0',
    ]);

    Jadwal::create($validated);

    return redirect()->route('jadwal')->with('success', 'Jadwal berhasil ditambahkan');
  }

  public function edit(Jadwal $jadwal)
  {
    return Inertia::render('admin/jadwal-form', [
      'jadwal' => $jadwal->load(['kereta', 'stasiunAsal', 'stasiunTujuan']),
      'keretas' => Kereta::all(),
      'stasiuns' => Stasiun::all(),
    ]);
  }

  public function update(Request $request, Jadwal $jadwal)
  {
    $validated = $request->validate([
      'id_kereta' => 'required|exists:kereta,id_kereta',
      'id_stasiun_asal' => 'required|exists:stasiun,id_stasiun',
      'id_stasiun_tujuan' => 'required|exists:stasiun,id_stasiun|different:id_stasiun_asal',
      'waktu_berangkat' => 'required|date',
      'waktu_tiba' => 'required|date|after:waktu_berangkat',
      'harga' => 'required|integer|min:0',
    ]);

    $jadwal->update($validated);

    return redirect()->route('jadwal')->with('success', 'Jadwal berhasil diubah');
  }

  public function destroy(Jadwal $jadwal)
  {
    $jadwal->delete();
    return redirect()->route('jadwal')->with('success', 'Jadwal berhasil dihapus');
  }
}
