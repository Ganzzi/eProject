<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function likePosts()
    {
        return $this->hasMany(LikePost::class);
    }

    public function conments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likeComments()
    {
        return $this->hasMany(LikeComment::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function activitylogs()
    {
        return $this->hasMany(ActivityLog::class);
    }

    public function follows()
    {
        return $this->hasMany(Follow::class);
    }

    public function chatRooms()
    {
        return $this->belongsToMany(ChatRoom::class, 'chat_room_user', 'user_id', 'chat_room_id')
            ->withTimestamps();
    }


    public function chats()
    {
        return $this->hasMany(Chat::class);
    }

    public function likeChats()
    {
        return $this->hasMany(LikeChat::class);
    }
}
