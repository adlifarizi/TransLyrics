<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Song;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminSongController extends Controller
{
    public function index(Request $request): JsonResponse
    {

        $user = $request->user();

        // Jika user tidak ditemukan (tidak terautentikasi)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        $artistId = $request->input('artist_id', null);
        $albumId = $request->input('album_id', null);
        $songId = $request->input('id', null);

        // Ambil parameter 'sort_by' dari query string, default ke 'name' jika tidak ada
        $sortBy = $request->input('sort_by', 'name');
        // Ambil parameter 'search' untuk pencarian berdasarkan nama lagu
        $searchTerm = $request->input('search', null);

        // Mulai query untuk mengambil lagu
        $query = Song::with(['artist', 'album', 'lyrics']);

        // Jika ada artist_id, filter lagu berdasarkan artist_id
        if ($artistId) {
            $query->where('artist_id', $artistId);
        }

        if ($albumId) {
            $query->where('album_id', $albumId);
        }

        // Jika ada song_id, lakukan increment pada views
        if ($songId) {
            // Cari lagu berdasarkan ID
            $song = $query->where('id', $songId)->first();

            // Kembalikan response dengan data lagu yang ditemukan
            return response()->json([
                'success' => true,
                'message' => 'Song retrieved successfully.',
                'data' => $song,
            ], 200);
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

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:artists,slug',
            'original_title' => 'nullable|string|max:255',
            'alternate_title' => 'nullable|string|max:255',
            'artist_id' => 'required|exists:artists,id',
            'album_id' => 'nullable|exists:albums,id',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'release_date' => 'nullable|date',
            'vocal' => 'nullable|string|max:255',
            'music' => 'nullable|string|max:255',
            'lyricist' => 'nullable|string',
            'composer' => 'nullable|string|max:255',
            'arrangement' => 'nullable|string|max:255',
            'youtube_embed' => 'nullable|string|max:255',
            'link_youtube_music' => 'nullable|string|max:255',
            'link_spotify' => 'nullable|string|max:255',
            'link_apple_music' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/songs', 'public');
            $validatedData['image'] = Storage::url($imagePath);
        }

        $song = Song::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Song created successfully.',
            'data' => $song,
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

        $song = Song::find($id);

        if (!$song) {
            return response()->json([
                'success' => false,
                'message' => 'Song not found.',
                'data' => null,
            ], 404);
        }

        $validatedData = $request->validate([
            'title' => 'nullable|string|max:255',
            'original_title' => 'nullable|string|max:255',
            'alternate_title' => 'nullable|string|max:255',
            'artist_id' => 'nullable|exists:artists,id',
            'album_id' => 'nullable|exists:albums,id',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'release_date' => 'nullable|date',
            'vocal' => 'nullable|string|max:255',
            'music' => 'nullable|string|max:255',
            'lyrics' => 'nullable|string',
            'composer' => 'nullable|string|max:255',
            'arrangement' => 'nullable|string|max:255',
            'youtube_embed' => 'nullable|string|max:255',
            'link_youtube_music' => 'nullable|string|max:255',
            'link_spotify' => 'nullable|string|max:255',
            'link_apple_music' => 'nullable|string|max:255',
        ]);

        // Jika album_id tidak ada atau secara eksplisit null, pastikan diubah menjadi null
        if (!$request->filled('album_id')) {
            $validatedData['album_id'] = null;
        }

        if ($request->hasFile('image')) {
            if ($song->image) {
                $oldImagePath = str_replace(Storage::url(''), '', $song->image);
                Storage::disk('public')->delete($oldImagePath);
            }

            $imagePath = $request->file('image')->store('images/songs', 'public');
            $validatedData['image'] = Storage::url($imagePath);
        }

        $song->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Song updated successfully.',
            'data' => $song,
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
        
        $song = Song::find($id);

        if (!$song) {
            return response()->json([
                'success' => false,
                'message' => 'Song not found.',
                'data' => null,
            ], 404);
        }

        if ($song->image) {
            $imagePath = str_replace(Storage::url(''), '', $song->image);
            Storage::disk('public')->delete($imagePath);
        }

        $song->delete();

        return response()->json([
            'success' => true,
            'message' => 'Song deleted successfully.',
            'data' => null,
        ], 200);
    }
}
