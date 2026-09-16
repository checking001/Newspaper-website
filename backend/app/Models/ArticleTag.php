<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticleTag extends Model
{
    protected $table = 'article_tags';

    protected $fillable = ['article_id', 'tag_id'];

    public $timestamps = true;

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }

    public function tag(): BelongsTo
    {
        return $this->belongsTo(Tag::class);
    }
}