<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Artist;
use App\Models\Song;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request): JsonResponse
    {
        $query = $request->input('query');

        // Validasi: Cek apakah query valid
        if (!$this->isValidQuery($query)) {
            return response()->json([
                'success' => true,
                'message' => 'No results found.',
                'data' => [
                    'artists' => [],
                    'albums' => [],
                    'songs' => [],
                ],
            ], 200);
        }

        // Fetch artists with their albums and songs
        $artists = Artist::with(['albums', 'songs'])
            ->where('name', 'like', "%$query%")
            ->get();

        // Fetch albums with their artist and songs
        $albums = Album::with(['artist', 'songs'])
            ->where('title', 'like', "%$query%")
            ->get();

        // Fetch songs with their artist, album, and lyrics
        $songs = Song::with(['artist', 'album', 'lyrics'])
            ->where('title', 'like', "%$query%")
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Search results retrieved successfully.',
            'data' => [
                'artists' => $artists,
                'albums' => $albums,
                'songs' => $songs,
            ],
        ], 200);
    }

    /**
     * Validasi query pencarian.
     *
     * @param string|null $query
     * @return bool
     */
    private function isValidQuery(?string $query): bool
    {
        // Pastikan query tidak kosong dan hanya berisi karakter yang valid (huruf, angka, spasi)
        return !empty($query) && preg_match('/^[a-zA-Z0-9\s]+$/', $query);
    }
}
