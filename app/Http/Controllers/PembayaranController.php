<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Tiket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PembayaranController extends Controller
{
  public function formPembayaran(Tiket $tiket)
  {
    $tiket->load(['penumpang', 'jadwal.kereta', 'jadwal.stasiunAsal', 'jadwal.stasiunTujuan']);

    if ($tiket->status_pembayaran === 'Lunas') {
      return redirect()->route('invoice', $tiket->id_tiket);
    }

    return Inertia::render('pembayaran', [
      'tiket' => $tiket,
    ]);
  }

  public function prosesPembayaran(Request $request, Tiket $tiket)
  {
    $validated = $request->validate([
      'metode_bayar' => 'required|in:Transfer Bank,E-Wallet,QRIS',
    ]);

    if ($tiket->status_pembayaran === 'Lunas') {
      return redirect()->route('invoice', $tiket->id_tiket);
    }

    DB::transaction(function () use ($tiket, $validated) {
      $tiket->update(['status_pembayaran' => 'Lunas']);

      Pembayaran::create([
        'id_tiket' => $tiket->id_tiket,
        'tanggal_bayar' => now(),
        'metode_bayar' => $validated['metode_bayar'],
        'jumlah' => $tiket->harga,
      ]);
    });

    return redirect()->route('invoice', $tiket->id_tiket);
  }
}
