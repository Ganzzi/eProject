<?php

namespace Database\Seeders;

use App\Models\LikeComment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikeCommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LikeComment::create([
            'Liker_Id' => 1,
            'Comment_Id' => 1,
            // Add more columns and values as needed...
        ]);

        LikeComment::create([
            'Liker_Id' => 2,
            'Comment_Id' => 2,
            // Add more columns and values as needed...
        ]);
    }
}
