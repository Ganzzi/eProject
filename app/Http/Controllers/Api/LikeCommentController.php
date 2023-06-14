<?php

namespace App\Http\Controllers\Api;

use App\Models\LikeComment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LikeCommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'comment_id' => 'required|exists:comments,id',
        ]);

        $user = $request->user();

        // Kiểm tra xem người dùng đã like comment này chưa
        $existingLike = LikeComment::where('comment_id', $request->input('comment_id'))
            ->where('liker_id', $user->id)
            ->first();

        if ($existingLike) {
            // Nếu đã like rồi, xóa like
            $existingLike->forceDelete();
            return response()->json(['message' => 'Unliked the comment.']);
        } else {
            // Nếu chưa like, tạo mới like
            $like = new LikeComment();
            $like->comment_id = $request->input('comment_id');
            $like->liker_id = $user->id;
            $like->save();

            return response()->json(['message' => 'Liked the comment.']);
        }
    }
}
