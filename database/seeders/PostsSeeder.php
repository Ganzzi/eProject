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
            'creator_id' => 2,
            'description' => 'My first post',
            'image' => '6yo69vr2k2UpeCkqu7roTEZ2pSJvx5stRthr8hBf.jpg',
        ]);

        Post::create([
            'creator_id' => 3,
            'description' => 'Check out this amazing photo',
            'image' => 'aTPYfafitbzEQxIiZN1pPQnW2WphCUCUKLRaIOIb.jpg',
        ]);

        Post::create([
            'creator_id' => 4,
            'description' => 'Good food',
            'image' => 'fvwAexLDBkbrdHELdLHifEa3q5BAlhxuDy1t8VCj.jpg',
        ]);
    }
}
