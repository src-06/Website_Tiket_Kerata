<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tiket', function (Blueprint $table) {
            $table->id('id_tiket');
            $table->foreignId('id_penumpang')->constrained('penumpang', 'id_penumpang')->cascadeOnDelete();
            $table->foreignId('id_jadwal')->constrained('jadwal', 'id_jadwal')->cascadeOnDelete();
            $table->string('kursi');
            $table->integer('harga');
            $table->enum('status_pembayaran', ['Belum Lunas', 'Lunas'])->default('Belum Lunas');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tiket');
    }
};
