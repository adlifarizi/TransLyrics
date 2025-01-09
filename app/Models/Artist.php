<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'debut_year',
        'social_x',
        'social_instagram',
        'social_youtube',
        'social_spotify',
    ];

    protected $casts = [
        'debut_year' => 'integer',
    ];

    // Auto-generate slug
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($artist) {
            // Generate slug dari name jika slug belum diset
            if (!$artist->slug) {
                $artist->slug = Str::slug($artist->name);
            }
        });

        static::updating(function ($artist) {
            // Generate ulang slug jika name berubah dan slug tidak diset manual
            if ($artist->isDirty('name') && !$artist->isDirty('slug')) {
                $artist->slug = Str::slug($artist->name);
            }
        });
    }

    public function albums()
    {
        return $this->hasMany(Album::class);
    }

    public function songs()
    {
        return $this->hasMany(Song::class);
    }
}
