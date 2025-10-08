<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class EquipmentLog extends Model
{
    use HasFactory;
    protected $fillable = ['equipment_id', 'user_id', 'action', 'action_at'];
}