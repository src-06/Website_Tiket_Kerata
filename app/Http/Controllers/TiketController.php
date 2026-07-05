<?php

namespace App\Http\Controllers;

use App\Models\Tiket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TiketController extends Controller
{
    public function index()
    {
        $tikets = Tiket::with(['detailTikets.penumpang', 'jadwal.kereta', 'jadwal.stasiunAsal', 'jadwal.stasiunTujuan'])
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/tiket', [
            'tikets' => [
                'data' => $tikets->items(),
                'meta' => [
                    'current_page' => $tikets->currentPage(),
                    'last_page' => $tikets->lastPage(),
                    'from' => $tikets->firstItem(),
                    'to' => $tikets->lastItem(),
                    'total' => $tikets->total(),
                    'links' => $tikets->linkCollection()->map(fn ($link) => [
                        'url' => $link['url'],
                        'label' => $link['label'],
                        'active' => $link['active'],
                    ]),
                ],
            ],
        ]);
    }

    public function tiketSaya(Request $request)
    {
        $tikets = Tiket::with(['detailTikets.penumpang', 'jadwal.kereta', 'jadwal.stasiunAsal', 'jadwal.stasiunTujuan'])
            ->whereHas('detailTikets', function ($q) use ($request) {
                $q->where('id_penumpang', $request->user()->id_penumpang);
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('tiket-saya', [
            'tikets' => [
                'data' => $tikets->items(),
                'meta' => [
                    'current_page' => $tikets->currentPage(),
                    'last_page' => $tikets->lastPage(),
                    'from' => $tikets->firstItem(),
                    'to' => $tikets->lastItem(),
                    'total' => $tikets->total(),
                    'links' => $tikets->linkCollection()->map(fn ($link) => [
                        'url' => $link['url'],
                        'label' => $link['label'],
                        'active' => $link['active'],
                    ]),
                ],
            ],
        ]);
    }
}
