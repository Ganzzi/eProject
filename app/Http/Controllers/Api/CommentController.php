<?php

namespace App\Http\Controllers\Api;

use App\Models\Comment;
use App\Http\Controllers\Controller;
use App\Models\LikeComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'post_id' => 'required|numeric',
            'text' => 'required|string',
            'reply_to' => 'nullable',
        ]);

        $user = Auth::user();

        // Create a new comment instance
        $comment = new Comment;
        $comment->post_id = $validatedData['post_id'];
        $comment->text = $validatedData['text'];
        $comment->commentor_id = $user->id;

        $replyToComment = Comment::find($validatedData['reply_to']);
        $comment->reply_to = $replyToComment ? $replyToComment->id : null;

        // Save the comment to the database
        $comment->save();

        // Return a response or redirect as needed
        return response()->json(['message' => 'Comment created successfully']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        $data = $request->validate([
            'text' => 'required|string|max:200',
        ]);

        $user = Auth::user();

        if ($comment->commentor_id != $user->id) {
            return response()->json(['You are not the commentor']);
        }

        $comment->text = $data['text'];

        $comment->save();

        return response()->json(['update success', 202]);
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Comment $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        // Kiểm tra xem người dùng có quyền xóa tin nhắn không
        $user = Auth::user();
        if ($comment->commentor_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $comments = Comment::whereIn('id', $comment)->get();

        $comments->each(function ($cmt) {
            Comment::where('reply_to', $cmt->id)->delete();
        });

        $likes = LikeComment::whereIn('id', $comment)->get();

        $likes->each(function ($like) {
            LikeComment::where('comment_id', $like->id)->delete();
        });

        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully'
        ]);
    }
}
