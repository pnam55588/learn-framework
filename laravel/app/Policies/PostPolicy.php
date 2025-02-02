<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function findById(User $user, Post $post)
    {
        return $user->id === $post->user_id;
    }

    public function create(User $user)
    {
        return $user->role==="admin";
    }
}
