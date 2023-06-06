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
            'Follower_Id' => 1,
            'Following_Id' => 2,
            'Follow-At' => now(),
            // Add more columns and values as needed...
        ]);

        Follow::create([
            'Follower_Id' => 2,
            'Following_Id' => 1,
            'Follow-At' => now(),
            // Add more columns and values as needed...
        ]);
    }
}
