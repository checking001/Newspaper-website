<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    public function run(): void
    {
        $authors = [
            [
                'name' => 'রহিম আহমেদ',
                'slug' => 'rahim-ahmed',
                'bio' => 'রাজনৈতিক সাংবাদিক এবং বিশ্লেষক',
                'designation' => 'রাজনীতি সংবাদদাতা',
                'email' => 'rahim@example.com',
            ],
            [
                'name' => 'সুমাইয়া খান',
                'slug' => 'sumaiya-khan',
                'bio' => 'অর্থনৈতিক খবরের বিশেষজ্ঞ',
                'designation' => 'অর্থনীতি সম্পাদক',
                'email' => 'sumaiya@example.com',
            ],
            [
                'name' => 'করিম হোসেন',
                'slug' => 'karim-hosen',
                'bio' => 'খেলাধুলার অভিজ্ঞ প্রতিবেদক',
                'designation' => 'ক্রীড়া সংবাদদাতা',
                'email' => 'karim@example.com',
            ],
            [
                'name' => 'নাজমা বেগম',
                'slug' => 'nazma-begum',
                'bio' => 'প্রযুক্তি এবং বিজ্ঞান ফোকাস',
                'designation' => 'প্রযুক্তি সংবাদদাতা',
                'email' => 'nazma@example.com',
            ],
        ];

        foreach ($authors as $author) {
            Author::create($author);
        }
    }
}