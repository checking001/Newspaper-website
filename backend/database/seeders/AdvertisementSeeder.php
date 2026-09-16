<?php

namespace Database\Seeders;

use App\Models\Advertisement;
use Illuminate\Database\Seeder;

class AdvertisementSeeder extends Seeder
{
    public function run(): void
    {
        $ads = [
            [
                'name' => 'হোম পেজ শীর্ষ ব্যানার',
                'advertiser' => 'নমুনা বিজ্ঞাপনকারী',
                'image_url' => 'https://via.placeholder.com/1200x300',
                'destination_url' => 'https://example.com',
                'placement' => 'header',
                'start_date' => now()->toDateString(),
                'end_date' => now()->addDays(30)->toDateString(),
                'status' => 'active',
                'priority' => 1,
                'device_targeting' => 'all',
            ],
            [
                'name' => 'নিবন্ধ শীর্ষ বিজ্ঞাপন',
                'advertiser' => 'প্রযুক্তি কোম্পানি',
                'image_url' => 'https://via.placeholder.com/600x400',
                'destination_url' => 'https://tech-example.com',
                'placement' => 'article_top',
                'start_date' => now()->toDateString(),
                'end_date' => now()->addDays(30)->toDateString(),
                'status' => 'active',
                'priority' => 2,
                'device_targeting' => 'all',
            ],
            [
                'name' => 'সাইডবার বিজ্ঞাপন',
                'advertiser' => 'ই-কমার্স প্ল্যাটফর্ম',
                'image_url' => 'https://via.placeholder.com/300x400',
                'destination_url' => 'https://ecommerce-example.com',
                'placement' => 'sidebar',
                'start_date' => now()->toDateString(),
                'end_date' => now()->addDays(30)->toDateString(),
                'status' => 'active',
                'priority' => 1,
                'device_targeting' => 'desktop',
            ],
        ];

        foreach ($ads as $ad) {
            Advertisement::create($ad);
        }
    }
}