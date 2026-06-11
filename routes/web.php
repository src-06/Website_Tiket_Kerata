<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\KeretaController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PemesananController;
use App\Http\Controllers\PencarianController;
use App\Http\Controllers\StasiunController;
use App\Http\Controllers\TiketController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PencarianController::class, 'home'])->name('home');
Route::get('/jadwal/cari', [PencarianController::class, 'cariJadwal'])->name('jadwal.cari');
Route::get('/booking/{jadwal}', [PemesananController::class, 'formBooking'])->name('booking.form');
Route::post('/booking', [PemesananController::class, 'simpanBooking'])->name('booking.simpan');
Route::get('/pembayaran/{tiket}', [PembayaranController::class, 'formPembayaran'])->name('pembayaran');
Route::post('/pembayaran/{tiket}', [PembayaranController::class, 'prosesPembayaran'])->name('pembayaran.proses');
Route::get('/invoice/{tiket}', [InvoiceController::class, 'invoice'])->name('invoice');

Route::get('/tiket', [TiketController::class, 'index'])->name('tiket');
Route::get('/jadwal', [JadwalController::class, 'index'])->name('jadwal');
Route::get('/jadwal/create', [JadwalController::class, 'create'])->name('jadwal.create');
Route::post('/jadwal', [JadwalController::class, 'store'])->name('jadwal.store');
Route::get('/jadwal/{jadwal}/edit', [JadwalController::class, 'edit'])->name('jadwal.edit');
Route::put('/jadwal/{jadwal}', [JadwalController::class, 'update'])->name('jadwal.update');
Route::delete('/jadwal/{jadwal}', [JadwalController::class, 'destroy'])->name('jadwal.destroy');
Route::get('/kereta', [KeretaController::class, 'index'])->name('kereta');
Route::get('/kereta/create', [KeretaController::class, 'create'])->name('kereta.create');
Route::post('/kereta', [KeretaController::class, 'store'])->name('kereta.store');
Route::get('/kereta/{kereta}/edit', [KeretaController::class, 'edit'])->name('kereta.edit');
Route::put('/kereta/{kereta}', [KeretaController::class, 'update'])->name('kereta.update');
Route::delete('/kereta/{kereta}', [KeretaController::class, 'destroy'])->name('kereta.destroy');
Route::get('/stasiun', [StasiunController::class, 'index'])->name('stasiun');
Route::get('/stasiun/create', [StasiunController::class, 'create'])->name('stasiun.create');
Route::post('/stasiun', [StasiunController::class, 'store'])->name('stasiun.store');
Route::get('/stasiun/{stasiun}/edit', [StasiunController::class, 'edit'])->name('stasiun.edit');
Route::put('/stasiun/{stasiun}', [StasiunController::class, 'update'])->name('stasiun.update');
Route::delete('/stasiun/{stasiun}', [StasiunController::class, 'destroy'])->name('stasiun.destroy');
