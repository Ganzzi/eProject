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
            'Chat_Room_ID' => 1,
            'Text' => 'Hello',
            'Sender_Id' => 1,
            // Add more columns and values as needed...
        ]);

        Chat::create([
            'Chat_Room_ID' => 2,
            'Text' => 'Hi there',
            'Sender_Id' => 2,
            // Add more columns and values as needed...
        ]);
    }
}
