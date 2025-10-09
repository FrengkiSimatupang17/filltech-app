<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Task extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'title',
        'description',
        'type',
        'status',
        'user_id',
        'subscription_id',
        'technician_id',
        'assigned_by',
        'assigned_at',
        'completed_at',
        'proof_path',
    ];

    protected $casts = [
        'assigned_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
             ->logOnly(['status', 'technician_id']) // Hanya catat perubahan pada kolom ini
             ->logOnlyDirty() // Hanya catat jika ada perubahan
             ->setDescriptionForEvent(fn(string $eventName) => "sebuah tugas telah di-{$eventName}")
             ->dontSubmitEmptyLogs();
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'technician_id');
    }
}