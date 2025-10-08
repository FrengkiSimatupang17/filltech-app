<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::table('equipment', function (Blueprint $table) {
            $table->foreignId('current_user_id')->nullable()->after('status')->comment('ID teknisi yang sedang meminjam')->constrained('users')->onDelete('set null');
        });
    }
    public function down(): void {
        Schema::table('equipment', function (Blueprint $table) {
            $table->dropForeign(['current_user_id']);
            $table->dropColumn('current_user_id');
        });
    }
};