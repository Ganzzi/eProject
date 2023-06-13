<?php

namespace App\Http\Controllers\Api;

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
        // Validate the request data
        // $validatedData = $request->validate([
        //     'chat_room_id' => 'required|numeric',
        //     'text' => 'required|string|max:255',
        //     'sender_id' => 'required|numeric',
        // ]);

        // // Create a new chat instance
        // $chat = new Chat;
        // $chat->chat_room_id = $validatedData['chat_room_id'];
        // $chat->text = $validatedData['text'];
        // $chat->sender_id = $validatedData['sender_id'];

        // // Save the chat to the database
        // $chat->save();

        // // Return a response or redirect as needed
        // return response()->json(['message' => 'Chat stored successfully']);





        // $validatedData = $request->validate([
        //     'chat_room_id' => 'required|numeric',
        //     'text' => 'required|string|max:255',
        // ]);

        // $chat = new Chat;
        // $chat->chat_room_id = $validatedData['chat_room_id'];
        // $chat->text = $validatedData['text'];
        // $chat->sender_id = Auth::id(); // Set the sender ID using the authenticated user

        // $chat->save();

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

        // return response()->json('dmm2');

        $chat->save();

        return response()->json(['message' => 'Chat created successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($chat)
    {
        $_chat = Chat::find($chat);

        // Kiểm tra xem người dùng có quyền xóa tin nhắn không
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
