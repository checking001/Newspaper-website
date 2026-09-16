<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HomepageSection extends Model
{
    protected $table = 'homepage_sections';

    protected $fillable = [
        'title',
        'category_id',
        'article_count',
        'is_enabled',
        'display_order',
        'layout_type',
        'featured_article_id',
    ];

    protected $casts = [
        'is_enabled' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function featuredArticle(): BelongsTo
    {
        return $this->belongsTo(Article::class, 'featured_article_id');
    }
}