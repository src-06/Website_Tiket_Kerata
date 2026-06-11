<?php

namespace App\Http\Controllers;

use App\Models\Stasiun;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StasiunController extends Controller
{
  public function index()
  {
    return Inertia::render('admin/stasiun', [
      'stasiuns' => Stasiun::latest()->get(),
    ]);
  }

  public function create()
  {
    return Inertia::render('admin/stasiun-form');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'nama_stasiun' => 'required|string|max:255',
      'kota' => 'required|string|max:255',
    ]);

    Stasiun::create($validated);

    return redirect()->route('stasiun')->with('success', 'Stasiun berhasil ditambahkan');
  }

  public function edit(Stasiun $stasiun)
  {
    return Inertia::render('admin/stasiun-form', [
      'stasiun' => $stasiun,
    ]);
  }

  public function update(Request $request, Stasiun $stasiun)
  {
    $validated = $request->validate([
      'nama_stasiun' => 'required|string|max:255',
      'kota' => 'required|string|max:255',
    ]);

    $stasiun->update($validated);

    return redirect()->route('stasiun')->with('success', 'Stasiun berhasil diubah');
  }

  public function destroy(Stasiun $stasiun)
  {
    $stasiun->delete();
    return redirect()->route('stasiun')->with('success', 'Stasiun berhasil dihapus');
  }
}
