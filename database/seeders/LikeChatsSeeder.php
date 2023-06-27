<?php

namespace Database\Seeders;

use App\Models\LikeChat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikeChatsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LikeChat::create([
            'liker_id' => 2,
            'chat_id' => 1,
            // Add more columns and values as needed...
        ]);

        LikeChat::create([
            'liker_id' => 3,
            'chat_id' => 2,
            // Add more columns and values as needed...
        ]);
    }
}
