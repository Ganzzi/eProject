<?php

namespace App\Http\Controllers\Api;

use App\Models\Comment;
use App\Http\Controllers\Controller;
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
            'reply_to' => 'nullable|exists:comments,id',
        ]);

        $user = Auth::user();

        // Create a new comment instance
        $comment = new Comment;
        $comment->post_id = $validatedData['post_id'];
        $comment->text = $validatedData['text'];
        $comment->commentor_id = $user->id;

        if ($validatedData['reply_to']) {
            $replyToComment = Comment::findOrFail($validatedData['reply_to']);
            $comment->reply_to = $replyToComment->id;
        }

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
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Comment $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully'
        ]);
    }
}
