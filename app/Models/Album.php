<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'original_title',
        'alternate_title',
        'artist_id',
        'image',
        'release_year',
    ];

    protected $casts = [
        'release_year' => 'integer',
    ];

    // Auto-generate slug
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($album) {
            // Pastikan relasi artist dimuat
            $album->load('artist');
    
            // Generate slug dari title dan artist jika slug belum diset
            if (!$album->slug && $album->artist) {
                $album->slug = Str::slug($album->title . '-' . $album->artist->name);
            }
        });

        static::updating(function ($album) {
            // Pastikan relasi artist dimuat
            $album->load('artist');
    
            // Generate ulang slug jika title atau artist berubah dan slug tidak diset manual
            if (
                ($album->isDirty('title') || $album->isDirty('artist_id')) &&
                !$album->isDirty('slug') &&
                $album->artist
            ) {
                $album->slug = Str::slug($album->title . '-' . $album->artist->name);
            }
        });
    }

    
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function songs()
    {
        return $this->hasMany(Song::class);
    }
}
