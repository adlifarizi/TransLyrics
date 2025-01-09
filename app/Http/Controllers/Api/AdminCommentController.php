<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminCommentController extends Controller
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

        $commentId = $request->input('id', null);
        $sortBy = $request->input('sort_by', 'newest');
        $searchTerm = $request->input('search', null);

        // Mulai query untuk mengambil komentar
        $query = Comment::query();

        // Filter berdasarkan id komentar jika ada
        if ($commentId) {
            $comment = $query->where('id', $commentId)->first();

            // Jika komentar ditemukan, kembalikan response
            if ($comment) {
                return response()->json([
                    'success' => true,
                    'message' => 'Comment retrieved successfully.',
                    'data' => $comment,
                ], 200);
            }

            // Jika komentar tidak ditemukan, kembalikan response error
            return response()->json([
                'success' => false,
                'message' => 'Comment not found.',
            ], 404);
        }

        // Jika ada pencarian berdasarkan konten komentar, tambahkan kondisi pencarian
        if ($searchTerm) {
            $query->where('content', 'like', '%' . $searchTerm . '%');
        }

        // Pengurutan berdasarkan parameter 'sort_by'
        if ($sortBy == 'newest') {
            $query->orderBy('created_at', 'desc');
        } elseif ($sortBy == 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            // Default pengurutan jika parameter tidak valid
            $query->orderBy('created_at', 'desc');
        }

        // Ambil hasil query untuk daftar komentar
        $comments = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'All comments retrieved successfully.',
            'data' => $comments,
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
        
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'success' => false,
                'message' => 'Comment not found.',
                'data' => null,
            ], 404);
        }

        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Comment deleted successfully.',
            'data' => null,
        ], 200);
    }
}
