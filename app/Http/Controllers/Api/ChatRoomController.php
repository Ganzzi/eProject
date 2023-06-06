<?php

namespace App\Http\Controllers\Api;

use App\Models\ChatRoom;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChatRoomController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ChatRoom $chatRoom)
    {
        $chatRoom->load('users', 'chats.likes');

        return response()->json([
            'chat_room_id' => $chatRoom->id,
            'created_at' => $chatRoom->created_at->toISOString(),
            'participants' => $chatRoom->users->map(function ($user) {
                return [
                    'paticipator_id' => $user->id,
                    'name' => $user->name,
                    'image' => $user->image,
                    'last_online' => $user->last_online->toISOString(),
                    'join_at' => $user->pivot->join_at->toISOString(),
                ];
            }),
            'chats' => $chatRoom->chats->map(function ($chat) {
                return [
                    'chat_id' => $chat->id,
                    'created_at' => $chat->created_at->toISOString(),
                    'text' => $chat->text,
                    'sender_id' => $chat->sender_id,
                    'likes' => $chat->likes->map(function ($like) {
                        return [
                            'liker' => $like->liker,
                            'created_at' => $like->created_at->toISOString(),
                        ];
                    })
                ];
            }),
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ChatRoom $chatRoom)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChatRoom $chatRoom)
    {
        //
    }
}