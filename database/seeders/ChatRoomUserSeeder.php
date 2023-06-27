<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChatRoomUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('chat_room_user')->insert([
            [
                'user_id' => 2,
                'chat_room_id' => 1,
                'join_at' => now(),
            ],
            [
                'user_id' => 3,
                'chat_room_id' => 1,
                'join_at' => now(),
            ],
            [
                'user_id' => 2,
                'chat_room_id' => 2,
                'join_at' => now(),
            ],
            [
                'user_id' => 4,
                'chat_room_id' => 2,
                'join_at' => now(),
            ],
        ]);
    }
}
