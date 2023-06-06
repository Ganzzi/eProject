<?php

namespace Database\Seeders;

use App\Models\Notification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotificationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Notification::create([
            'Receiver_Id' => 1,
            'Type' => 'Message',
            'Text' => 'You have a new message',
            'Seen' => false,
            // Add more columns and values as needed...
        ]);

        Notification::create([
            'Receiver_Id' => 2,
            'Type' => 'Follow',
            'Text' => 'You have a new follower',
            'Seen' => false,
            // Add more columns and values as needed...
        ]);
    }
}
