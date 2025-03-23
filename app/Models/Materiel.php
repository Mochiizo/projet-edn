<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materiel extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'pack_id'];

    public function pack()
    {
        return $this->belongsTo(Pack::class);
    }
}
