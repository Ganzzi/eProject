<?php

namespace Database\Seeders;

use App\Models\Follow;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FollowsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Follow::create([
            'follower_id' => 1,
            'following_id' => 2,
            'follow_at' => now(),
            // Add more columns and values as needed...
        ]);

        Follow::create([
            'follower_id' => 2,
            'following_id' => 1,
            'follow_at' => now(),
            // Add more columns and values as needed...
        ]);
    }
}