<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminArtistController extends Controller
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

        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

        $artistId = $request->input('id', null);

        // Ambil parameter 'sort_by' dari query string, default ke 'name' jika tidak ada
        $sortBy = $request->input('sort_by', 'name');
        $searchTerm = $request->input('search', null);  // Untuk pencarian berdasarkan nama artis

        // Mulai query untuk mengambil artis
        $query = Artist::with(['albums', 'songs'])
            ->withCount([
                'songs as translyrics_count' => function ($query) {
                    $query->whereHas('lyrics', function ($query) {
                        $query->where('type', 'translyrics');
                    })->distinct();  // Pastikan setiap song hanya dihitung sekali
                }
            ]);

        // Filter berdasarkan id album jika ada
        if ($artistId) {
            // Cari album berdasarkan ID
            $artist = $query->where('id', $artistId)->first();

            // Kembalikan response dengan data album yang ditemukan
            return response()->json([
                'success' => true,
                'message' => 'Artist retrieved successfully.',
                'data' => $artist,
            ], 200);
        }


        // Jika ada pencarian berdasarkan nama, tambahkan kondisi pencarian
        if ($searchTerm) {
            $query->where('name', 'like', '%' . $searchTerm . '%');
        }

        // Pengurutan berdasarkan parameter 'sort_by'
        if ($sortBy == 'views') {
            // Urutkan berdasarkan views (misalnya berdasarkan jumlah views yang sudah terhitung)
            $query->orderBy('views', 'desc');
        } elseif ($sortBy == 'name') {
            // Urutkan berdasarkan nama artis
            $query->orderBy('name', 'asc');
        } elseif ($sortBy == 'newest') {
            // Urutkan berdasarkan waktu penambahan terbaru
            $query->orderBy('created_at', 'desc');
        } else {
            // Default pengurutan (misalnya berdasarkan views jika parameter tidak valid)
            $query->orderBy('name', 'asc');
        }

        // Ambil hasil query
        $artists = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'All artists retrieved successfully.',
            'data' => $artists,
        ], 200);
    }

    public function listArtists(Request $request): JsonResponse
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

        // Ambil hanya id dan name dari semua artis
        $artists = Artist::select('id', 'name')->orderBy('name', 'asc')->get();

        return response()->json([
            'success' => true,
            'message' => 'All artists retrieved successfully.',
            'data' => $artists,
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

        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:artists,slug',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'debut_year' => 'nullable|integer',
            'social_x' => 'nullable|string|max:255',
            'social_instagram' => 'nullable|string|max:255',
            'social_youtube' => 'nullable|string|max:255',
            'social_spotify' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/artists', 'public');
            $validatedData['image'] = Storage::url($imagePath);
        }

        $artist = Artist::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Artist created successfully.',
            'data' => $artist,
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

        $artist = Artist::find($id);

        if (!$artist) {
            return response()->json([
                'success' => false,
                'message' => 'Artist not found.',
                'data' => null,
            ], 404);
        }

        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'debut_year' => 'nullable|integer',
            'social_x' => 'nullable|string|max:255',
            'social_instagram' => 'nullable|string|max:255',
            'social_youtube' => 'nullable|string|max:255',
            'social_spotify' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            if ($artist->image) {
                $oldImagePath = str_replace(Storage::url(''), '', $artist->image);
                Storage::disk('public')->delete($oldImagePath);
            }

            $imagePath = $request->file('image')->store('images/artists', 'public');
            $validatedData['image'] = Storage::url($imagePath);
        }

        $artist->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Artist updated successfully.',
            'data' => $artist,
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

        $artist = Artist::find($id);

        if (!$artist) {
            return response()->json([
                'success' => false,
                'message' => 'Artist not found.',
                'data' => null,
            ], 404);
        }

        if ($artist->image) {
            $imagePath = str_replace(Storage::url(''), '', $artist->image);
            Storage::disk('public')->delete($imagePath);
        }

        $artist->delete();

        return response()->json([
            'success' => true,
            'message' => 'Artist deleted successfully.',
            'data' => null,
        ], 200);
    }
}
