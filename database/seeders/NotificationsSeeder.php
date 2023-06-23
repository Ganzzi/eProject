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
            'receiver_id' => 1,
            'type' => 'Message',
            'text' => 'You have a new message',
            'state' => 'unread',
            // Add more columns and values as needed...
        ]);

        Notification::create([
            'receiver_id' => 2,
            'type' => 'Follow',
            'text' => 'You have a new follower',
            'state' => 'unread',
            // Add more columns and values as needed...
        ]);
    }
}
