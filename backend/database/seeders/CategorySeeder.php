<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'বাংলাদেশ', 'slug' => 'bangladesh', 'parent_id' => null, 'display_order' => 1],
            ['name' => 'ঢাকা', 'slug' => 'dhaka', 'parent_id' => 1, 'display_order' => 1],
            ['name' => 'চট্টগ্রাম', 'slug' => 'chattogram', 'parent_id' => 1, 'display_order' => 2],
            ['name' => 'সিলেট', 'slug' => 'sylhet', 'parent_id' => 1, 'display_order' => 3],
            
            ['name' => 'রাজনীতি', 'slug' => 'politics', 'parent_id' => null, 'display_order' => 2],
            ['name' => 'জাতীয় রাজনীতি', 'slug' => 'national-politics', 'parent_id' => 5, 'display_order' => 1],
            ['name' => 'আন্তর্জাতিক রাজনীতি', 'slug' => 'international-politics', 'parent_id' => 5, 'display_order' => 2],
            
            ['name' => 'অর্থনীতি', 'slug' => 'economy', 'parent_id' => null, 'display_order' => 3],
            ['name' => 'ব্যবসা', 'slug' => 'business', 'parent_id' => 8, 'display_order' => 1],
            ['name' => 'শেয়ার বাজার', 'slug' => 'stock-market', 'parent_id' => 8, 'display_order' => 2],
            
            ['name' => 'ক্রীড়া', 'slug' => 'sports', 'parent_id' => null, 'display_order' => 4],
            ['name' => 'ক্রিকেট', 'slug' => 'cricket', 'parent_id' => 11, 'display_order' => 1],
            ['name' => 'ফুটবল', 'slug' => 'football', 'parent_id' => 11, 'display_order' => 2],
            
            ['name' => 'বিনোদন', 'slug' => 'entertainment', 'parent_id' => null, 'display_order' => 5],
            ['name' => 'চলচ্চিত্র', 'slug' => 'movie', 'parent_id' => 14, 'display_order' => 1],
            ['name' => 'সংগীত', 'slug' => 'music', 'parent_id' => 14, 'display_order' => 2],
            
            ['name' => 'প্রযুক্তি', 'slug' => 'technology', 'parent_id' => null, 'display_order' => 6],
            ['name' => 'শিক্ষা', 'slug' => 'education', 'parent_id' => null, 'display_order' => 7],
            ['name' => 'স্বাস্থ্য', 'slug' => 'health', 'parent_id' => null, 'display_order' => 8],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}