<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('join_at')
            ->withTimestamps();
    }

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
}
