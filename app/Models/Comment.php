<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    // Tentukan kolom yang dapat diisi massal
    protected $fillable = [
        'name',
        'content',
    ];
}
