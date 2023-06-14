<?php

namespace App\Http\Controllers\Admin;

use App\Models\ChatRoom;
use App\Http\Controllers\Controller;

class ChatRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chatRooms = ChatRoom::with('users', 'chats.likes')->get();

        return response()->json($chatRooms);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($chatRooms)
    {
        // Find the chat room by ID
        $room = ChatRoom::with('users', 'chats.likes')->find($chatRooms);

        if (!$room) {
            return response()->json(['success' => false, 'message' => 'Chat room not found'], 404);
        }

        // Detach users from the chat room
        $room->users()->detach();

        // Delete chats and associated like chats
        $room->chats()->each(function ($chat) {
            $chat->likes()->delete();
            $chat->delete();
        });

        // Delete the chat room
        $room->delete();

        return response()->json(['success' => true, 'message' => 'Chat room deleted successfully']);
    }
}
