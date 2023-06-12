<?php

namespace App\Http\Controllers\Api;

use App\Models\ChatRoom;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class ChatRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chatrooms = ChatRoom::with('users', 'chats.likes')->get();

        return response()->json($chatrooms);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required',
            'user_id2' => 'required'
        ]);

        $userId1 = $validatedData['user_id'];
        $userId2 = $validatedData['user_id2'];

        $chatRoom = ChatRoom::create();

        $chatRoom->users()->attach([
            $userId1 => ['join_at' => now()],
            $userId2 => ['join_at' => now()]
        ]);

        return response(['message' => 'Chat room created successfully', 'chat_room_id' => $chatRoom->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show($chatRoom)
    {
        $room = ChatRoom::with('users', 'chats.likes')->find($chatRoom);
        // return response()->json(['data' => $room]);

        $lastMessage = $room->chats()->orderByDesc('created_at')->first();

        // Lấy tất cả các tin nhắn reply của tin nhắn gốc
        $replyToId = $lastMessage->id; // Thay thế $lastMessage->id bằng ID của tin nhắn gốc cụ thể
        $replies = Chat::where('reply_to', $replyToId)->get();

        return response()->json([
            'chat_room_id' => $room->id,
            'created_at' => $room->created_at->toISOString(),
            'participants' => $room->users->map(function ($user) {
                return [
                    'paticipator_id' => $user->id,
                    'name' => $user->name,
                    'image' => $user->image,
                    'created_at' => $user->pivot->created_at,
                ];
            }),

            'chats' => $room->chats->map(function ($chat) {
                return [
                    'chat_id' => $chat->id,
                    'created_at' => $chat->created_at->toISOString(),
                    'text' => $chat->text,
                    'sender_id' => $chat->sender_id,
                    'likes' => $chat->likes->map(function ($like) {
                        return [
                            'liker' => $like->liker_id,
                            'created_at' => $like->created_at->toISOString(),
                        ];
                    })
                ];
            }),

            'replies' => $replies->map(function ($reply) {
                return [
                    'reply_id' => $reply->id,
                    'created_at' => $reply->created_at->toISOString(),
                    'text' => $reply->text,
                    'sender_id' => $reply->sender_id,
                    'likes' => $reply->likes->map(function ($like) {
                        $username = User::find($like->liker_id)->name;
                        return [
                            'liker' => $username,
                        ];
                    })
                ];
            }),

            'last_message' => $lastMessage ? [
                'chat_id' => $lastMessage->id,
                'created_at' => $lastMessage->created_at->toISOString(),
                'text' => $lastMessage->text,
                'sender_id' => $lastMessage->sender_id,
                'likes' => $lastMessage->likes->map(function ($like) {
                    $username = User::find($like->liker_id)->name;
                    return [
                        'liker' => $username,
                    ];
                })
            ] : null,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdateChatRoomRequest $request, ChatRoom $chatRoom)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($chatRoom)
    {
        // Find the chat room by ID
        $room = ChatRoom::find($chatRoom);

        if (!$room) {
            return response()->json(['success' => false, 'message' => 'Chat room not found'], 404);
        }

        // Detach users from the chat room
        $room->users()->detach();

        // Delete chats and associated like chats
        $room->chats()->each(function ($chat) {
            $chat->likeChats()->delete();
            $chat->delete();
        });

        // Delete the chat room
        $room->delete();

        return response()->json(['success' => true, 'message' => 'Chat room deleted successfully']);
    }
}