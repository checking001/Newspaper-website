<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * List all admins (Super Admin only)
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);

        $admins = User::where('role', '!=', 'user')
            ->paginate($request->get('limit', 15));

        return response()->json([
            'data' => $admins->items(),
            'pagination' => [
                'total' => $admins->total(),
                'per_page' => $admins->perPage(),
                'current_page' => $admins->currentPage(),
                'last_page' => $admins->lastPage(),
            ],
        ]);
    }

    /**
     * Create new admin user (Super Admin only)
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:admin,super_admin',
            'permissions' => 'array|nullable',
            'is_active' => 'boolean|default:true',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        // Sync permissions if provided
        if (!empty($validated['permissions'])) {
            $user->syncPermissions($validated['permissions']);
        }

        return response()->json([
            'message' => 'Admin created successfully',
            'data' => $user,
        ], 201);
    }

    /**
     * Get single admin details
     */
    public function show(User $user)
    {
        $this->authorize('view', $user);

        return response()->json([
            'data' => $user->load('permissions'),
        ]);
    }

    /**
     * Update admin details (Super Admin only)
     */
    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $validated = $request->validate([
            'name' => 'string|max:255|nullable',
            'email' => [
                'email',
                'nullable',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'role' => 'in:admin,super_admin|nullable',
            'permissions' => 'array|nullable',
            'is_active' => 'boolean|nullable',
        ]);

        $user->update(array_filter($validated, fn($value) => $value !== null));

        // Sync permissions if provided
        if (!empty($validated['permissions'])) {
            $user->syncPermissions($validated['permissions']);
        }

        return response()->json([
            'message' => 'Admin updated successfully',
            'data' => $user,
        ]);
    }

    /**
     * Delete admin (Super Admin only)
     */
    public function destroy(User $user)
    {
        $this->authorize('delete', $user);

        // Prevent deleting last super admin
        if ($user->role === 'super_admin' && User::where('role', 'super_admin')->count() <= 1) {
            return response()->json([
                'message' => 'Cannot delete the last super admin',
            ], 422);
        }

        $user->delete();

        return response()->json([
            'message' => 'Admin deleted successfully',
        ]);
    }

    /**
     * Get admin activity logs
     */
    public function activityLog(Request $request, User $user)
    {
        $this->authorize('view', $user);

        $logs = $user->activityLogs()
            ->latest()
            ->paginate($request->get('limit', 20));

        return response()->json([
            'data' => $logs->items(),
            'pagination' => [
                'total' => $logs->total(),
                'per_page' => $logs->perPage(),
                'current_page' => $logs->currentPage(),
            ],
        ]);
    }

    /**
     * Toggle admin status (activate/deactivate)
     */
    public function toggleStatus(User $user)
    {
        $this->authorize('update', $user);

        $user->update(['is_active' => !$user->is_active]);

        return response()->json([
            'message' => 'Admin status updated',
            'data' => $user,
        ]);
    }

    /**
     * Reset admin password (Super Admin only)
     */
    public function resetPassword(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user->update(['password' => Hash::make($validated['password'])]);

        return response()->json([
            'message' => 'Password reset successfully',
        ]);
    }

    /**
     * Get all available permissions
     */
    public function getPermissions()
    {
        $permissions = [
            'view_articles' => 'দেখুন নিবন্ধ',
            'create_articles' => 'নিবন্ধ তৈরি করুন',
            'edit_articles' => 'নিবন্ধ সম্পাদনা করুন',
            'delete_articles' => 'নিবন্ধ মুছুন',
            'view_categories' => 'বিভাগ দেখুন',
            'create_categories' => 'বিভাগ তৈরি করুন',
            'edit_categories' => 'বিভাগ সম্পাদনা করুন',
            'delete_categories' => 'বিভাগ মুছুন',
            'view_admins' => 'প্রশাসক দেখুন',
            'create_admins' => 'প্রশাসক তৈরি করুন',
            'edit_admins' => 'প্রশাসক সম্পাদনা করুন',
            'delete_admins' => 'প্রশাসক মুছুন',
            'view_settings' => 'সেটিংস দেখুন',
            'edit_settings' => 'সেটিংস সম্পাদনা করুন',
        ];

        return response()->json(['data' => $permissions]);
    }
}