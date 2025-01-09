<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $comment = Comment::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Comment created successfully.',
            'data' => $comment,
        ], 201);
    }

}
