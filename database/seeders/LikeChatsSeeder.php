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
            'Liker_Id' => 1,
            'Chat_Id' => 1,
            // Add more columns and values as needed...
        ]);

        LikeChat::create([
            'Liker_Id' => 2,
            'Chat_Id' => 2,
            // Add more columns and values as needed...
        ]);
    }
}
