<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->longText('content');
            $table->string('featured_image')->nullable();
            $table->string('featured_image_caption')->nullable();
            $table->foreignId('category_id')->constrained('categories')->onDelete('restrict');
            $table->foreignId('author_id')->constrained('authors')->onDelete('restrict');
            $table->string('status')->default('draft');
            $table->dateTime('published_at')->nullable();
            $table->dateTime('scheduled_at')->nullable();
            $table->boolean('is_breaking')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_trending')->default(false);
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('canonical_url')->nullable();
            $table->string('location')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreignId('deleted_by')->nullable()->constrained('users')->nullOnDelete();

            $table->index('slug');
            $table->index('status');
            $table->index('published_at');
            $table->index('category_id');
            $table->index('author_id');
            $table->index('is_breaking');
            $table->index('is_featured');
            $table->index('is_trending');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};