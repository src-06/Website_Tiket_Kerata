<?php

namespace App\Http\Controllers;

use App\Models\Penumpang;
use Inertia\Inertia;

class PenumpangController extends Controller
{
    public function index()
    {
        $penumpangs = Penumpang::latest()
            ->paginate(10);

        return Inertia::render('admin/penumpang', [
            'penumpangs' => [
                'data' => $penumpangs->items(),
                'meta' => [
                    'current_page' => $penumpangs->currentPage(),
                    'last_page' => $penumpangs->lastPage(),
                    'from' => $penumpangs->firstItem(),
                    'to' => $penumpangs->lastItem(),
                    'total' => $penumpangs->total(),
                    'links' => $penumpangs->linkCollection()->map(fn ($link) => [
                        'url' => $link['url'],
                        'label' => $link['label'],
                        'active' => $link['active'],
                    ]),
                ],
            ],
        ]);
    }
}
