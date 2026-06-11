<?php

namespace App\Http\Controllers;

use App\Models\Kereta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeretaController extends Controller
{
  public function index()
  {
    return Inertia::render('admin/kereta', [
      'keretas' => Kereta::latest()->get(),
    ]);
  }

  public function create()
  {
    return Inertia::render('admin/kereta-form');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'nama_kereta' => 'required|string|max:255',
      'kelas' => 'required|string|max:50',
    ]);

    Kereta::create($validated);

    return redirect()->route('kereta')->with('success', 'Kereta berhasil ditambahkan');
  }

  public function edit(Kereta $kereta)
  {
    return Inertia::render('admin/kereta-form', [
      'kereta' => $kereta,
    ]);
  }

  public function update(Request $request, Kereta $kereta)
  {
    $validated = $request->validate([
      'nama_kereta' => 'required|string|max:255',
      'kelas' => 'required|string|max:50',
    ]);

    $kereta->update($validated);

    return redirect()->route('kereta')->with('success', 'Kereta berhasil diubah');
  }

  public function destroy(Kereta $kereta)
  {
    $kereta->delete();
    return redirect()->route('kereta')->with('success', 'Kereta berhasil dihapus');
  }
}
