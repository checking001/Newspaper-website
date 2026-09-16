<?php

namespace Database\Seeders;

use App\Models\HomepageSection;
use Illuminate\Database\Seeder;

class HomepageSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            [
                'title' => 'সর্বশেষ খবর',
                'category_id' => null,
                'article_count' => 10,
                'is_enabled' => true,
                'display_order' => 1,
                'layout_type' => 'list',
            ],
            [
                'title' => 'বাংলাদেশ',
                'category_id' => 1,
                'article_count' => 8,
                'is_enabled' => true,
                'display_order' => 2,
                'layout_type' => 'grid',
            ],
            [
                'title' => 'রাজনীতি',
                'category_id' => 5,
                'article_count' => 6,
                'is_enabled' => true,
                'display_order' => 3,
                'layout_type' => 'grid',
            ],
            [
                'title' => 'অর্থনীতি',
                'category_id' => 8,
                'article_count' => 6,
                'is_enabled' => true,
                'display_order' => 4,
                'layout_type' => 'grid',
            ],
            [
                'title' => 'ক্রীড়া',
                'category_id' => 11,
                'article_count' => 5,
                'is_enabled' => true,
                'display_order' => 5,
                'layout_type' => 'grid',
            ],
            [
                'title' => 'বিনোদন',
                'category_id' => 14,
                'article_count' => 5,
                'is_enabled' => true,
                'display_order' => 6,
                'layout_type' => 'grid',
            ],
            [
                'title' => 'প্রযুক্তি',
                'category_id' => 17,
                'article_count' => 5,
                'is_enabled' => true,
                'display_order' => 7,
                'layout_type' => 'grid',
            ],
        ];

        foreach ($sections as $section) {
            HomepageSection::create($section);
        }
    }
}