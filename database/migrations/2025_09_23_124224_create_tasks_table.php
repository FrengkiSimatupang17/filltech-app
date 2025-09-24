<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('type', ['installation', 'repair']);
            $table->enum('status', ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'])->default('pending');

            $table->foreignId('user_id')->comment('Client yang terkait dengan tugas')->constrained('users')->onDelete('cascade');
            $table->foreignId('subscription_id')->nullable()->comment('Subscription jika ini tugas instalasi')->constrained('subscriptions')->onDelete('cascade');
            $table->foreignId('technician_id')->nullable()->comment('Teknisi yang ditugaskan')->constrained('users')->onDelete('set null');
            $table->foreignId('assigned_by')->nullable()->comment('Admin yang menugaskan')->constrained('users')->onDelete('set null');
            
            $table->timestamp('assigned_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};