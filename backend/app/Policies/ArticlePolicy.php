<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;

class ArticlePolicy
{
    /**
     * Admin can view all articles
     */
    public function viewAny(User $user): bool
    {
        return in_array($user->role->name, ['admin', 'super_admin']);
    }

    /**
     * Admin can view any article
     */
    public function view(User $user, Article $article): bool
    {
        return in_array($user->role->name, ['admin', 'super_admin']);
    }

    /**
     * Admin can create articles
     */
    public function create(User $user): bool
    {
        return in_array($user->role->name, ['admin', 'super_admin']);
    }

    /**
     * Only the author (as user) or super_admin can update
     */
    public function update(User $user, Article $article): bool
    {
        if ($user->role->name === 'super_admin') {
            return true;
        }

        if ($user->role->name === 'admin') {
            // Can only edit own articles or articles they have permission to
            return $article->author_id === $user->id;
        }

        return false;
    }

    /**
     * Only super_admin or article author can delete
     */
    public function delete(User $user, Article $article): bool
    {
        if ($user->role->name === 'super_admin') {
            return true;
        }

        if ($user->role->name === 'admin') {
            return $article->author_id === $user->id;
        }

        return false;
    }

    /**
     * Only super_admin can publish/unpublish
     */
    public function publish(User $user, Article $article): bool
    {
        return $user->role->name === 'super_admin';
    }
}