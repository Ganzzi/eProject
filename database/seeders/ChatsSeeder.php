<?php

namespace Database\Seeders;

use App\Models\Chat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChatsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Chat::create([
            'chat_id' => 1,
            'chat_room_id' => 1,
            'text' => 'Hello',
            'sender_id' => 1,
            // Add more columns and values as needed...
        ]);

        Chat::create([
            'chat_id' => 2,
            'chat_room_id' => 2,
            'text' => 'Hi there',
            'sender_id' => 2,
            // Add more columns and values as needed...
        ]);
    }
}