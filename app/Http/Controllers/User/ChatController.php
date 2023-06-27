<?php

namespace App\Http\Controllers\User;

use App\Models\Chat;
use App\Http\Controllers\Controller;
use App\Models\LikeChat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'chat_room_id' => 'required|numeric',
            'text' => 'required|string',
            'reply_to' => 'nullable|exists:chats,id',
        ]);

        $user = Auth::user();

        $chat = new Chat();
        $chat->chat_room_id = $validatedData['chat_room_id'];
        $chat->text = $validatedData['text'];
        $chat->sender_id = $user->id;

        if (isset($validatedData['reply_to'])) {
            $replyToChat = Chat::findOrFail($validatedData['reply_to']);
            $chat->reply_to = $replyToChat->id;
        }

        $chat->save();

        return response()->json(['message' => 'Chat created successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($chat)
    {
        $_chat = Chat::find($chat);

        $user = Auth::user();
        if ($_chat->sender_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $chats = Chat::whereIn('id', $_chat)->get();

        $chats->each(function ($chat) {
            Chat::where('reply_to', $chat->id)->delete();
        });

        $likes = LikeChat::whereIn('id', $_chat)->get();

        $likes->each(function ($like) {
            LikeChat::where('chat_id', $like->id)->delete();
        });

        $_chat->delete();

        return response()->json(['message' => 'Chat deleted.']);
    }
}
