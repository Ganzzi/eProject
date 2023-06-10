<?php

namespace App\Http\Controllers\Api;

use App\Models\Chat;
use App\Models\ChatRoom;
use App\Models\LikeChat;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chats = Chat::all();

        return response()->json($chats);
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

        // Lấy danh sách các like của tin nhắn
        $likes = $chat->likes()->get();

        return response()->json([
            'chat_id' => $chat->id,
            'sender_id' => $chat->sender_id,
            'message' => $chat->message,
            'created_at' => $chat->created_at->toISOString(),
            'likes' => $likes,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        // Lấy thông tin chi tiết của tin nhắn và danh sách các like
        $chat->load('sender_id', 'chat.likes');

        return response()->json([
            'chat_id' => $chat->id,
            'sender' => $chat->sender,
            'message' => $chat->message,
            'created_at' => $chat->created_at->toISOString(),
            'likes' => $chat->likes,
        ]);
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
        // Kiểm tra xem người dùng có quyền xóa tin nhắn không
        $user = Auth::user();
        if ($chat->sender_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }
        
        // Xóa tin nhắn khỏi database
        $chat->delete();

        return response()->json(['message' => 'Chat deleted.']);
    }
}