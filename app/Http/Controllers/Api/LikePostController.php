<?php

namespace App\Http\Controllers\Api;

use App\Models\LikePost;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LikePostController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required',
        ]);

        $user = $request->user();

        // Kiểm tra xem người dùng đã thích bài viết chưa
        $existingLike = LikePost::where('post_id', $request->input('post_id'))
            ->where('liker_id', $user->id)
            ->first();

        if ($existingLike) {
            $existingLike->forceDelete();
            return response()->json(['message' => 'Unliked the post']);
        } else {
            // Thêm lượt thích bài viết vào cơ sở dữ liệu
            $like = new LikePost();
            $like->post_id = $request->input('post_id');
            $like->liker_id = $user->id;
            $like->save();

            return response()->json(['message' => 'Post liked successfully']);
        }
    }
}
