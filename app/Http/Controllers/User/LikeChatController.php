<?php

namespace App\Http\Controllers\User;

use App\Models\LikeChat;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LikeChatController extends Controller
{
    /**
     * Store a newly created resource or delete an existing one in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'chat_id' => 'required|exists:chats,id',
        ]);

        $user = $request->user();

        // Kiểm tra xem người dùng đã like tin nhắn này chưa
        $existingLike = LikeChat::where('chat_id', $request->input('chat_id'))
            ->where('liker_id', $user->id)
            ->first();

        if ($existingLike) {
            // Nếu đã like rồi, xóa like
            $existingLike->forceDelete();
            return response()->json(['message' => 'Unliked the chat.']);
        } else {
            // Nếu chưa like, tạo mới like
            $like = new LikeChat();
            $like->chat_id = $request->input('chat_id');
            $like->liker_id = $user->id;
            $like->save();

            return response()->json(['message' => 'Liked the chat.']);
        }
    }
}
