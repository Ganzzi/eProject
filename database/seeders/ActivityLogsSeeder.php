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
            'User_Id' => 1,
            'Type' => 'Login',
            'Describe' => 'User logged in',
            // Add more columns and values as needed...
        ]);

        ActivityLog::create([
            'User_Id' => 2,
            'Type' => 'Post',
            'Describe' => 'User created a new post',
            // Add more columns and values as needed...
        ]);
    }
}
