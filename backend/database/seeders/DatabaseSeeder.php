<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            AuthorSeeder::class,
            TagSeeder::class,
            ArticleSeeder::class,
            SettingSeeder::class,
            HomepageSectionSeeder::class,
            AdvertisementSeeder::class,
        ]);
    }
}