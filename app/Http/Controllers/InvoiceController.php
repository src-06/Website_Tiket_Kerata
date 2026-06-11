<?php

namespace App\Http\Controllers;

use App\Models\Tiket;
use Inertia\Inertia;

class InvoiceController extends Controller
{
  public function invoice(Tiket $tiket)
  {
    $tiket->load(['penumpang', 'jadwal.kereta', 'jadwal.stasiunAsal', 'jadwal.stasiunTujuan', 'pembayaran']);

    return Inertia::render('invoice', [
      'tiket' => $tiket,
    ]);
  }
}
