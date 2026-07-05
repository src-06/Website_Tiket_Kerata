<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tiket', function (Blueprint $table) {
            $table->dropForeign(['id_penumpang']);
            $table->dropColumn('id_penumpang');
            $table->dropColumn('kursi');
            $table->renameColumn('harga', 'total_harga');
        });
    }

    public function down(): void
    {
        Schema::table('tiket', function (Blueprint $table) {
            $table->renameColumn('total_harga', 'harga');
            $table->string('kursi');
            $table->foreignId('id_penumpang')->constrained('penumpang', 'id_penumpang')->cascadeOnDelete();
        });
    }
};
