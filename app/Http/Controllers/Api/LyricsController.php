<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lyrics;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LyricsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        // Ambil parameter 'song_id' dan 'id' dari query string
        $songId = $request->input('song_id', null);
        $lyricId = $request->input('id', null);

        // Mulai query untuk mengambil lirik
        $query = Lyrics::with('song');

        // Jika ada song_id, filter lirik berdasarkan song_id
        if ($songId) {
            $query->where('song_id', $songId);
        }

        // Jika ada id lirik, filter lirik berdasarkan id
        if ($lyricId) {
            $query->where('id', $lyricId);
        }

        // Ambil hasil query
        $lyrics = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Lyrics retrieved successfully.',
            'data' => $lyrics,
        ], 200);
    }

}
