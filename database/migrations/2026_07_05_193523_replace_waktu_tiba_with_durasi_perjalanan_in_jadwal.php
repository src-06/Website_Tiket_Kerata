<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('jadwal', function (Blueprint $table) {
            $table->dropColumn('waktu_tiba');
            $table->unsignedSmallInteger('durasi_perjalanan')->after('waktu_berangkat')->comment('dalam menit');
        });
    }

    public function down(): void
    {
        Schema::table('jadwal', function (Blueprint $table) {
            $table->dropColumn('durasi_perjalanan');
            $table->dateTime('waktu_tiba')->after('waktu_berangkat');
        });
    }
};
