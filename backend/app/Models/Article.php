<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'summary',
        'content',
        'featured_image',
        'featured_image_caption',
        'category_id',
        'author_id',
        'status',
        'published_at',
        'scheduled_at',
        'is_breaking',
        'is_featured',
        'is_trending',
        'seo_title',
        'seo_description',
        'canonical_url',
        'location',
        'deleted_by',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'scheduled_at' => 'datetime',
        'is_breaking' => 'boolean',
        'is_featured' => 'boolean',
        'is_trending' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'article_tags');
    }

    public function revisions(): HasMany
    {
        return $this->hasMany(ArticleRevision::class)->orderBy('revision_number');
    }

    public function deletedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }

    public function homepageSections(): HasMany
    {
        return $this->hasMany(HomepageSection::class, 'featured_article_id');
    }
}