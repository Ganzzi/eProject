<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call(RolesSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(ChatRoomsSeeder::class);
        $this->call(ChatsSeeder::class);
        $this->call(LikeChatsSeeder::class);
        $this->call(PostsSeeder::class);
        $this->call(LikePostsSeeder::class);
        $this->call(CommentsSeeder::class);
        $this->call(LikeCommentsSeeder::class);
        $this->call(FollowsSeeder::class);
        $this->call(NotificationsSeeder::class);
        $this->call(ActivityLogsSeeder::class);
        $this->call(ChatRoomUserSeeder::class);
    }
}
