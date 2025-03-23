<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pack extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'status'];

    public function materiels()
    {
        return $this->hasMany(Materiel::class);
    }

    public function emprunts()
    {
        return $this->hasMany(Emprunt::class);
    }
}
