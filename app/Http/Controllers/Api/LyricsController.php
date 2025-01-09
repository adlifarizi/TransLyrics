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


    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'song_id' => 'required|exists:songs,id',
            'type' => 'required|in:original,romanized,translyrics',
            'language' => 'required|string|max:10',
            'content' => 'required|string',
        ]);

        $lyrics = Lyrics::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Lyrics created successfully.',
            'data' => $lyrics,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $lyrics = Lyrics::find($id);

        if (!$lyrics) {
            return response()->json([
                'success' => false,
                'message' => 'Lyrics not found.',
                'data' => null,
            ], 404);
        }

        $validatedData = $request->validate([
            'song_id' => 'nullable|exists:songs,id',
            'type' => 'nullable|in:original,romanized,translyrics',
            'language' => 'nullable|string|max:10',
            'content' => 'nullable|string',
        ]);

        $lyrics->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Lyrics updated successfully.',
            'data' => $lyrics,
        ], 200);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $lyrics = Lyrics::find($id);

        if (!$lyrics) {
            return response()->json([
                'success' => false,
                'message' => 'Lyrics not found.',
                'data' => null,
            ], 404);
        }

        $lyrics->delete();

        return response()->json([
            'success' => true,
            'message' => 'Lyrics deleted successfully.',
            'data' => null,
        ], 200);
    }
}
