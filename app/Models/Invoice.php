<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany; // <-- IMPORT INI

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'user_id',
        'subscription_id',
        'amount',
        'status',
        'type',
        'due_date',
        'paid_at',
    ];

    /**
     * Definisikan relasi: Satu Invoice bisa memiliki banyak catatan pembayaran.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}