<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::create([
            'creator_id' => 1,
            'description' => 'My first post',
            'image' => 'HAdg89dezWCfLcwOyfNGiIDHO2zKBMzgsUTnS13R.png',
        ]);

        Post::create([
            'creator_id' => 2,
            'description' => 'Check out this amazing photo',
            'image' => 'HAdg89dezWCfLcwOyfNGiIDHO2zKBMzgsUTnS13R.png',
        ]);
    }
}
