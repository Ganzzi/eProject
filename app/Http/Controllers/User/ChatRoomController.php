<?php

namespace App\Http\Controllers\User;

use App\Models\Chat;
use App\Models\ChatRoom;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     * * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $user_id = Auth::user()->id;

        // find all chatrooms belong to a user
        $chatrooms = ChatRoom::whereHas('users', function ($query) use ($user_id) {
            $query->where('id', $user_id);
        })
            ->with('users', 'chats.likes')
            ->get();

        return response()->json(
            $chatrooms->map(function ($room) {
                $lastMessage = $room->chats()->orderByDesc('created_at')->first();

                return [
                    'id' =>  $room->id,
                    'participants' => $room->users->map(function ($user) {
                        return [
                            'paticipator_id' => $user->id,
                            'name' => $user->name,
                            'image' => $user->image,
                            'join_at' => $user->pivot->join_at,
                        ];
                    }),
                    'last_message' => $lastMessage ? [
                        'chat_id' => $lastMessage->id,
                        'created_at' => $lastMessage->created_at->toISOString(),
                        'image' => $lastMessage->image,
                        'text' => $lastMessage->text,
                        'sender_id' => $lastMessage->sender_id,
                        'likes' => $lastMessage->likes->map(function ($like) {
                            $username = User::find($like->liker_id)->name;
                            return [
                                'liker' => $username,
                            ];
                        })
                    ] : null,
                ];
            })

        );
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

        return response()->json([
            'chat_room_id' => $room->id,
            'created_at' => $room->created_at->toISOString(),
            'participants' => $room->users->map(function ($user) {
                return [
                    'paticipator_id' => $user->id,
                    'name' => $user->name,
                    'image' => $user->image,
                ];
            }),

            'chats' => $room->chats->map(function ($chat) {
                return [
                    'chat_id' => $chat->id,
                    'created_at' => $chat->created_at->toISOString(),
                    'image' => $chat->image,
                    'text' => $chat->text,
                    'sender_id' => $chat->sender_id,
                    'reply_to' => $chat->reply_to,
                    'likes' => $chat->likes->map(function ($like) {
                        return [
                            'liker' => $like->liker_id,
                            'created_at' => $like->created_at->toISOString(),
                        ];
                    })
                ];
            }),
        ]);
    }
}
