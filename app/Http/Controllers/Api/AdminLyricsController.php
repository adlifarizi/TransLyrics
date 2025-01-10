<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lyrics;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminLyricsController extends Controller
{

    public function store(Request $request): JsonResponse
    {

        $user = $request->user();

        // Jika user tidak ditemukan (tidak terautentikasi)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

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

        $user = $request->user();

        // Jika user tidak ditemukan (tidak terautentikasi)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

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

        $user = $request->user();

        // Jika user tidak ditemukan (tidak terautentikasi)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

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
