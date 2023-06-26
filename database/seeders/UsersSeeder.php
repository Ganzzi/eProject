<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id' => 1,
            'role_id' => 1,
            'name' => 'admin',
            'password' => bcrypt('admin123'),
            'email' => 'admin@gmail.com',
            'image' => '6NUvqmFzwp3Y4L7n3AXbPnptPma2mPxKpFjYEcbB.jpg',
            'bio' => 'Lorem ipsum dolor sit amet.',
            'gender' => 'male',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'id' => 2,
            'role_id' => 2,
            'name' => 'Jane Smith',
            'password' => bcrypt('user123'),
            'email' => 'user1@gmail.com',
            'image' => '6NUvqmFzwp3Y4L7n3AXbPnptPma2mPxKpFjYEcbB.jpg',
            'bio' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            'gender' => 'male',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'id' => 3,
            'role_id' => 2,
            'name' => 'John',
            'password' => bcrypt('user123'),
            'email' => 'user2@gmail.com',
            'image' => 'Nl4NDoouLFVzSKDNVknARq16gdFLWrl2hk23mK9U.jpg',
            'bio' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            'gender' => 'male',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'id' => 4,
            'role_id' => 2,
            'name' => 'Anna',
            'password' => bcrypt('user123'),
            'email' => 'user3@gmail.com',
            'image' => 'slH2NOdY5oFqXBz7JfKkZojyGSqhL95gKdhjnQaM.jpg',
            'bio' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            'gender' => 'female',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'id' => 5,
            'role_id' => 2,
            'name' => 'Louis',
            'password' => bcrypt('user123'),
            'email' => 'user4@gmail.com',
            'image' => 'ZAUaJRZugpCligkWqoPC00PivNKZYBcoFaqubj5n.jpg',
            'bio' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            'gender' => 'male',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
