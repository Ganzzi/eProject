<?php

namespace App\Http\Controllers\Api;

use App\Models\LikePost;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\ActivityLogController;
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

            // Create a notification
            $receiverId = $like->post->creator_id;
            $type = 'Like post';
            $text = 'Someone liked your post.';
    
            $notificationController = new NotificationController();
            $notificationController->store($receiverId, $type, $text);

            // Create a activity log
            $userId = $like->liker_id;
            $type = 'Like post';
            $describe = "You have liked someone else's post.";
    
            $activityLogController = new ActivityLogController();
            $activityLogController->store($userId, $type, $describe);

            return response()->json(['like_post' => $like, 'message' => 'Someone liked your post.']);
        }
    }
}