<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('detail_tiket', function (Blueprint $table) {
            $table->id('id_detail_tiket');
            $table->foreignId('id_tiket')->constrained('tiket', 'id_tiket')->cascadeOnDelete();
            $table->foreignId('id_penumpang')->constrained('penumpang', 'id_penumpang')->cascadeOnDelete();
            $table->string('nama')->nullable();
            $table->string('nama_kursi', 3);
            $table->integer('harga_satuan');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('detail_tiket');
    }
};
