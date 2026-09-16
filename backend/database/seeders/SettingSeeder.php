<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'খবরের কাগজ', 'type' => 'string'],
            ['key' => 'site_description', 'value' => 'বাংলাদেশের শীর্ষস্থানীয় ডিজিটাল সংবাদপত্র', 'type' => 'string'],
            ['key' => 'site_url', 'value' => 'http://localhost:3000', 'type' => 'string'],
            ['key' => 'api_url', 'value' => 'http://localhost:8000/api', 'type' => 'string'],
            ['key' => 'timezone', 'value' => 'Asia/Dhaka', 'type' => 'string'],
            ['key' => 'email_from', 'value' => 'noreply@khoborer-kagoj.local', 'type' => 'string'],
            ['key' => 'max_articles_per_page', 'value' => '20', 'type' => 'integer'],
            ['key' => 'enable_breaking_news', 'value' => '1', 'type' => 'boolean'],
            ['key' => 'enable_comments', 'value' => '0', 'type' => 'boolean'],
            ['key' => 'items_per_homepage_section', 'value' => '10', 'type' => 'integer'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}