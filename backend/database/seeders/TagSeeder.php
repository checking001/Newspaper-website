<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            ['name' => 'দুর্নীতি', 'slug' => 'corruption'],
            ['name' => 'নির্বাচন', 'slug' => 'election'],
            ['name' => 'সরকার', 'slug' => 'government'],
            ['name' => 'ডিজিটাল বাংলাদেশ', 'slug' => 'digital-bangladesh'],
            ['name' => 'পরিবেশ', 'slug' => 'environment'],
            ['name' => 'শিক্ষা সংকট', 'slug' => 'education-crisis'],
            ['name' => 'স্বাস্থ্য সেবা', 'slug' => 'healthcare'],
            ['name' => 'অর্থনৈতিক মন্দা', 'slug' => 'recession'],
            ['name' => 'বৈদেশিক বিনিয়োগ', 'slug' => 'foreign-investment'],
            ['name' => 'আন্তর্জাতিক সম্পর্ক', 'slug' => 'international-relations'],
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }
}