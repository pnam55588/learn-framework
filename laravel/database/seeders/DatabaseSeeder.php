<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(5)->create();

        \App\Models\User::factory()->create([
            'name' => 'Pham Ha Nam',
            'email' => 'nam@admin.com',
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
            'role' => 'admin',
            // 'refresh_token' => Str::random(10),
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Pham Ha Nam',
            'email' => 'nam@user.com',
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
            'role' => 'user',
            // 'refresh_token' => Str::random(10),
        ]);
        
        \App\Models\Post::factory(50)->create();
    }
}
