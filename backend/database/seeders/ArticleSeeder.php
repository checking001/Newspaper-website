<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'title' => 'নতুন অর্থনৈতিক নীতি ঘোষণা করা হয়েছে',
                'slug' => 'new-economic-policy-announced',
                'summary' => 'সরকার আগামী বছরের জন্য নতুন অর্থনৈতিক নীতি ঘোষণা করেছে।',
                'content' => 'নতুন নীতি ব্যবসা এবং বিনিয়োগকারীদের জন্য অনুকূল পরিবেশ তৈরি করবে।',
                'category_id' => 8,
                'author_id' => 2,
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'is_breaking' => false,
                'is_featured' => true,
            ],
            [
                'title' => 'বাংলাদেশ ক্রিকেট দলের বিজয়',
                'slug' => 'bangladesh-cricket-victory',
                'summary' => 'বাংলাদেশ টিম আন্তর্জাতিক ম্যাচে বিজয়ী হয়েছে।',
                'content' => 'দলটি অসাধারণ পারফরম্যান্স প্রদর্শন করেছে এবং চূড়ান্ত জয়ী হয়েছে।',
                'category_id' => 12,
                'author_id' => 3,
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'is_breaking' => true,
                'is_featured' => false,
            ],
            [
                'title' => 'প্রযুক্তি খাতে নতুন বিনিয়োগ',
                'slug' => 'new-investment-in-tech-sector',
                'summary' => 'বিদেশী কোম্পানি প্রযুক্তি খাতে বড় বিনিয়োগ করতে চায়।',
                'content' => 'এই বিনিয়োগ দেশের প্রযুক্তি উন্নয়নে গুরুত্বপূর্ণ ভূমিকা রাখবে।',
                'category_id' => 17,
                'author_id' => 4,
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'is_breaking' => false,
                'is_featured' => true,
            ],
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }
    }
}