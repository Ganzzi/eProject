<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LikeChat extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, 'Liker_id');
    }

    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }
}