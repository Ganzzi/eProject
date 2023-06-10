<?php

namespace Database\Seeders;

use App\Models\ActivityLog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActivityLogsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ActivityLog::create([
            'user_id' => 1,
            'type' => 'Login',
            'describe' => 'User logged in',
            // Add more columns and values as needed...
        ]);

        ActivityLog::create([
            'user_id' => 2,
            'type' => 'Post',
            'describe' => 'User created a new post',
            // Add more columns and values as needed...
        ]);
    }
}
