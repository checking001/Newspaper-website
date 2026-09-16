<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('homepage_sections', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->integer('article_count')->default(10);
            $table->boolean('is_enabled')->default(true);
            $table->integer('display_order')->default(0);
            $table->string('layout_type')->default('grid');
            $table->foreignId('featured_article_id')->nullable()->constrained('articles')->onDelete('set null');
            $table->timestamps();

            $table->index('category_id');
            $table->index('display_order');
            $table->index('is_enabled');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('homepage_sections');
    }
};