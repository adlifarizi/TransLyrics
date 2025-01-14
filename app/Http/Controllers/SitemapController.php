<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Album;
use App\Models\Song;
use Carbon\Carbon;

class SitemapController extends Controller
{
    public function index()
    {
        $artists = Artist::all();
        $albums = Album::all();
        $songs = Song::all();

        return response()->view('sitemap', [
            'artists' => $artists,
            'albums' => $albums,
            'songs' => $songs,
        ])->header('Content-Type', 'application/xml');
    }
}