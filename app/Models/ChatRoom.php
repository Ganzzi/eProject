<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class, 'chat_room_user', 'chat_room_id', 'user_id')
            ->withTimestamps();
    }

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
}