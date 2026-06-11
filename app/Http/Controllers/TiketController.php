<?php

namespace App\Http\Controllers;

use App\Models\Tiket;
use Inertia\Inertia;

class TiketController extends Controller
{
  public function index()
  {
    $tikets = Tiket::with(['penumpang', 'jadwal.kereta', 'jadwal.stasiunAsal', 'jadwal.stasiunTujuan'])
      ->latest()
      ->get();

    return Inertia::render('admin/tiket', [
      'tikets' => $tikets,
    ]);
  }
}
