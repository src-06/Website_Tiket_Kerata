<?php

namespace App\Http\Controllers;

use App\Models\Stasiun;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StasiunController extends Controller
{
    public function index()
    {
        $stasiuns = Stasiun::latest()->paginate(10);

        return Inertia::render('admin/stasiun', [
            'stasiuns' => [
                'data' => $stasiuns->items(),
                'meta' => [
                    'current_page' => $stasiuns->currentPage(),
                    'last_page' => $stasiuns->lastPage(),
                    'from' => $stasiuns->firstItem(),
                    'to' => $stasiuns->lastItem(),
                    'total' => $stasiuns->total(),
                    'links' => $stasiuns->linkCollection()->map(fn ($link) => [
                        'url' => $link['url'],
                        'label' => $link['label'],
                        'active' => $link['active'],
                    ]),
                ],
            ],
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
