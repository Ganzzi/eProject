<?php

namespace App\Http\Controllers\Api;

use App\Models\Chat;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
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

        $chat = new Chat();
        $chat->sender_id = $user->id;
        $chat->chat_room_id = $request->input('chat_room_id');
        $chat->text = $request->input('message');
        $chat->save();

        return response()->json([
            'message' => 'create succesfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($chat)
    {
        $chat = Chat::find($chat);

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
