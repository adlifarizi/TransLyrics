<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Song extends Model
{
    use HasFactory;

    // Tentukan kolom yang dapat diisi massal
    protected $fillable = [
        'title',
        'slug',
        'original_title',
        'alternate_title',
        'artist_id',
        'album_id',
        'image',
        'release_date',
        'vocal',
        'music',
        'lyricist',
        'composer',
        'arrangement',
        'youtube_embed',
        'link_youtube_music',
        'link_spotify',
        'link_apple_music',
    ];

    // Auto-generate slug
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($song) {
            // Pastikan relasi artist dimuat
            $song->load('artist');
    
            // Generate slug dari title dan artist jika slug belum diset
            if (!$song->slug && $song->artist) {
                $song->slug = Str::slug($song->title . '-' . $song->artist->name);
            }
        });

        static::updating(function ($song) {
            // Pastikan relasi artist dimuat
            $song->load('artist');
    
            // Generate ulang slug jika title atau artist berubah dan slug tidak diset manual
            if (
                ($song->isDirty('title') || $song->isDirty('artist_id')) &&
                !$song->isDirty('slug') &&
                $song->artist
            ) {
                $song->slug = Str::slug($song->title . '-' . $song->artist->name);
            }
        });
    }

    protected $casts = [
        'release_date' => 'date',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    public function lyrics()
    {
        return $this->hasMany(Lyrics::class);
    }
}
