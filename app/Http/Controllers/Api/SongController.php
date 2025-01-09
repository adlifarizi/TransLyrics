<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Artist;
use App\Models\Song;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SongController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $songId = $request->input('id', null);
        $songSlug = $request->input('slug', null);

        $artistId = $request->input('artist_id', null);

        $albumId = $request->input('album_id', null);

        // Ambil parameter 'sort_by' dari query string, default ke 'name' jika tidak ada
        $sortBy = $request->input('sort_by', 'name');
        // Ambil parameter 'search' untuk pencarian berdasarkan nama lagu
        $searchTerm = $request->input('search', null);

        // Mulai query untuk mengambil lagu
        $query = Song::with(['artist', 'album', 'lyrics']);

        // Jika ada song_id, lakukan increment pada views
        if ($songId) {
            // Cari lagu berdasarkan ID
            $song = $query->where('id', $songId)->first();

            // Jika lagu ditemukan, lakukan increment pada views
            if ($song) {
                $song->increment('views');
            }

            // Kembalikan response dengan data lagu yang ditemukan
            return response()->json([
                'success' => true,
                'message' => 'Song retrieved successfully.',
                'data' => $song,
            ], 200);
        }

        // Filter berdasarkan slug jika ada
        if ($songSlug) {
            // Cari song berdasarkan slug
            $song = $query->where('slug', $songSlug)->first();

            // Jika album ditemukan, lakukan increment pada views
            if ($song) {
                $song->increment('views');
            }

            // Kembalikan response dengan data album yang ditemukan
            return response()->json([
                'success' => true,
                'message' => 'Song retrieved successfully.',
                'data' => $song,
            ], 200);
        }

        // Jika ada artist_id, filter lagu berdasarkan artist_id
        if ($artistId) {
            $query->where('artist_id', $artistId);
        }

        if ($albumId) {
            $query->where('album_id', $albumId);
        }

        // Jika ada pencarian berdasarkan nama lagu, tambahkan kondisi pencarian
        if ($searchTerm) {
            $query->where('title', 'like', '%' . $searchTerm . '%');
        }

        // Pengurutan berdasarkan parameter 'sort_by'
        if ($sortBy == 'views') {
            // Urutkan berdasarkan views secara menurun
            $query->orderBy('views', 'desc');
        } elseif ($sortBy == 'title') {
            // Urutkan berdasarkan nama lagu secara alfabetik
            $query->orderBy('title', 'asc');
        } elseif ($sortBy == 'newest') {
            // Urutkan berdasarkan waktu penambahan terbaru
            $query->orderBy('created_at', 'desc');
        } elseif ($sortBy == 'release_date') {
            // Urutkan berdasarkan released date terbaru
            $query->orderBy('release_date', 'desc');
        } else {
            // Default pengurutan (misalnya berdasarkan nama jika parameter tidak valid)
            $query->orderBy('title', 'asc');
        }

        // Ambil hasil query untuk daftar lagu
        $songs = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'All songs retrieved successfully.',
            'data' => $songs,
        ], 200);
    }

}
