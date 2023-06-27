<?php

namespace App\Http\Controllers\User;

use App\Models\LikeComment;
use App\Http\Controllers\Controller;
use App\Http\Controllers\User\ActivityLogController;
use App\Http\Controllers\User\NotificationController;
use Illuminate\Http\Request;

class LikeCommentController extends Controller
{
    /**
     * Store a newly created resource or delete an existing one in storage.
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

            // Create a notification
            $notificationController = new NotificationController();
            $receiverId = $like->comment->commentor_id;
            $notificationController->store($receiverId, 'Like comment', 'Your comment has been liked.');

            // Create a activity log
            $activityLogController = new ActivityLogController();
            $userId = $user->id;
            $activityLogController->store($userId, 'Like comment', "You have liked someone else's comment.");

            return response()->json(['like_comment' => $like, 'message' => 'Your comment has been liked.']);
        }
    }
}
