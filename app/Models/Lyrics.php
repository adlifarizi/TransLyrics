<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lyrics extends Model
{
    use HasFactory;

    // Tentukan kolom yang dapat diisi massal
    protected $fillable = [
        'song_id',
        'type',
        'language',
        'content',
    ];

    // Tentukan tipe data untuk kolom yang tidak bisa diubah secara otomatis
    protected $casts = [
        'type' => 'string',
    ];

    // Relasi ke model Song
    public function song()
    {
        return $this->belongsTo(Song::class);
    }
}
