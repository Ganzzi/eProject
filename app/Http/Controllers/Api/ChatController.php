<?php

namespace App\Http\Controllers\Api;

use App\Models\Chat;
use App\Models\ChatRoom;
use App\Models\LikeChat;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\NewChatMessage;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'chat_room_id' => 'required|exists:chat_rooms,id',
            'message' => 'required|string',
        ]);

        $user = Auth::user();

        // Lưu tin nhắn vào database
        $chat = new Chat();
        $chat->sender_id = $user->id;
        $chat->chat_room_id = $request->input('chat_room_id');
        $chat->message = $request->input('message');
        $chat->save();

        // Gửi sự kiện để cập nhật tin nhắn mới cho các client đang kết nối
        event(new NewChatMessage($chat));

        return response()->json([
            'chat_id' => $chat->id,
            'sender_id' => $chat->sender_id,
            'message' => $chat->message,
            'created_at' => $chat->created_at->toISOString(),
            'likes' => [],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        // Xóa tin nhắn khỏi database
        $chat->delete();

        // Gửi sự kiện để cập nhật tin nhắn đã bị xóa cho các client đang kết nối
        event(new NewChatMessage($chat));

        return response()->json(['message' => 'Chat deleted.']);
    }

    // public function sendMessage(Request $request)
    // {
    //     $request->validate([
    //         'chat_room_id' => 'required|exists:chat_rooms,id',
    //         'message' => 'required|string',
    //     ]);

    //     $user = Auth::user();

    //     $chat = new Chat();
    //     $chat->sender_id = $user->id;
    //     $chat->chat_room_id = $request->input('chat_room_id');
    //     $chat->message = $request->input('message');
    //     $chat->save();

    //     return response()->json([
    //         'chat_id' => $chat->id,
    //         'sender_id' => $chat->sender_id,
    //         'message' => $chat->message,
    //         'created_at' => $chat->created_at->toISOString(),
    //         'likes' => [],
    //     ]);
    // }

    //     public function likeChat(Request $request, Chat $chat)
    // {
    //     $user = Auth::user();

    //     $existingLike = LikeChat::where('chat_id', $chat->id)
    //         ->where('liker_id', $user->id)
    //         ->first();

    //     if ($existingLike) {
    //         $existingLike->delete();
    //         return response()->json(['message' => 'Unliked the chat.']);
    //     }

    //     $like = new LikeChat();
    //     $like->chat_id = $chat->id;
    //     $like->liker_id = $user->id;
    //     $like->save();

    //     return response()->json(['message' => 'Liked the chat.']);
    // }
}