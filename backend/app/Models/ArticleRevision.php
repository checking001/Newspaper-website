<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticleRevision extends Model
{
    protected $table = 'article_revisions';

    protected $fillable = [
        'article_id',
        'revision_number',
        'content',
        'metadata',
        'changed_by',
    ];

    protected $casts = [
        'metadata' => 'json',
    ];

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }

    public function changedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}