<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Only super_admin can view users
     */
    public function viewAny(User $user): bool
    {
        return $user->role->name === 'super_admin';
    }

    /**
     * Only super_admin can view specific user
     */
    public function view(User $user, User $model): bool
    {
        return $user->role->name === 'super_admin';
    }

    /**
     * Only super_admin can create users
     */
    public function create(User $user): bool
    {
        return $user->role->name === 'super_admin';
    }

    /**
     * Super_admin can update any user, user can update themselves
     */
    public function update(User $user, User $model): bool
    {
        return $user->role->name === 'super_admin' || $user->id === $model->id;
    }

    /**
     * Only super_admin can delete users
     */
    public function delete(User $user, User $model): bool
    {
        return $user->role->name === 'super_admin';
    }
}