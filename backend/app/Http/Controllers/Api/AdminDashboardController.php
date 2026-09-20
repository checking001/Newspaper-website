<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Article;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    /**
     * Get dashboard statistics
     */
    public function statistics()
    {
        $currentAdmin = auth()->user();

        return response()->json([
            'data' => [
                'total_articles' => Article::count(),
                'total_admins' => User::where('role', '!=', 'user')->count(),
                'published_articles' => Article::where('status', 'published')->count(),
                'draft_articles' => Article::where('status', 'draft')->count(),
                'total_views' => Article::sum('views'),
                'recent_activities' => ActivityLog::latest()
                    ->limit(10)
                    ->with('user')
                    ->get(),
                'admin_info' => [
                    'name' => $currentAdmin->name,
                    'email' => $currentAdmin->email,
                    'role' => $currentAdmin->role,
                    'last_login' => $currentAdmin->last_login_at,
                    'is_active' => $currentAdmin->is_active,
                ],
            ],
        ]);
    }

    /**
     * Get detailed activity report
     */
    public function activityReport(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'date|nullable',
            'end_date' => 'date|nullable',
            'admin_id' => 'integer|nullable',
            'action' => 'string|nullable',
            'model_type' => 'string|nullable',
        ]);

        $query = ActivityLog::with('user');

        if ($validated['start_date'] ?? null) {
            $query->whereDate('created_at', '>=', $validated['start_date']);
        }

        if ($validated['end_date'] ?? null) {
            $query->whereDate('created_at', '<=', $validated['end_date']);
        }

        if ($validated['admin_id'] ?? null) {
            $query->where('user_id', $validated['admin_id']);
        }

        if ($validated['action'] ?? null) {
            $query->where('action', $validated['action']);
        }

        if ($validated['model_type'] ?? null) {
            $query->where('model_type', $validated['model_type']);
        }

        $logs = $query->latest()->paginate($request->get('limit', 20));

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
     * Get admin profile
     */
    public function profile()
    {
        $user = auth()->user();

        return response()->json([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'is_active' => $user->is_active,
                'created_at' => $user->created_at,
                'last_login_at' => $user->last_login_at,
                'permissions' => $user->permissions->pluck('name'),
            ],
        ]);
    }

    /**
     * Update admin profile
     */
    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => 'string|max:255|nullable',
            'email' => 'email|unique:users,email,' . $user->id . '|nullable',
            'password' => 'string|min:8|confirmed|nullable',
        ]);

        if ($validated['password'] ?? null) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update(array_filter($validated));

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => $user,
        ]);
    }

    /**
     * Get admin performance metrics
     */
    public function performanceMetrics(Request $request)
    {
        $adminId = $request->get('admin_id') ?? auth()->id();
        $days = $request->get('days', 30);

        $activities = ActivityLog::where('user_id', $adminId)
            ->where('created_at', '>=', now()->subDays($days))
            ->get()
            ->groupBy(fn($log) => $log->created_at->format('Y-m-d'));

        return response()->json([
            'data' => [
                'total_activities' => ActivityLog::where('user_id', $adminId)
                    ->where('created_at', '>=', now()->subDays($days))
                    ->count(),
                'activities_by_type' => ActivityLog::where('user_id', $adminId)
                    ->where('created_at', '>=', now()->subDays($days))
                    ->groupBy('action')
                    ->selectRaw('action, count(*) as count')
                    ->get(),
                'activities_by_date' => $activities->map(fn($logs) => [
                    'date' => $logs->first()->created_at->format('Y-m-d'),
                    'count' => $logs->count(),
                ]),
            ],
        ]);
    }

    /**
     * Search admins with filters
     */
    public function searchAdmins(Request $request)
    {
        $validated = $request->validate([
            'search' => 'string|nullable',
            'role' => 'string|nullable',
            'is_active' => 'boolean|nullable',
            'sort' => 'string|in:name,email,created_at|nullable',
            'order' => 'string|in:asc,desc|nullable',
        ]);

        $query = User::where('role', '!=', 'user');

        if ($validated['search'] ?? null) {
            $query->where(function ($q) use ($validated) {
                $q->where('name', 'like', '%' . $validated['search'] . '%')
                    ->orWhere('email', 'like', '%' . $validated['search'] . '%');
            });
        }

        if ($validated['role'] ?? null) {
            $query->where('role', $validated['role']);
        }

        if (isset($validated['is_active'])) {
            $query->where('is_active', $validated['is_active']);
        }

        $sort = $validated['sort'] ?? 'created_at';
        $order = $validated['order'] ?? 'desc';
        $query->orderBy($sort, $order);

        $admins = $query->paginate($request->get('limit', 15));

        return response()->json([
            'data' => $admins->items(),
            'pagination' => [
                'total' => $admins->total(),
                'per_page' => $admins->perPage(),
                'current_page' => $admins->currentPage(),
            ],
        ]);
    }

    /**
     * Bulk update admin status
     */
    public function bulkToggleStatus(Request $request)
    {
        $validated = $request->validate([
            'admin_ids' => 'required|array',
            'admin_ids.*' => 'integer|exists:users,id',
            'status' => 'required|boolean',
        ]);

        $updated = User::whereIn('id', $validated['admin_ids'])
            ->where('role', '!=', 'user')
            ->update(['is_active' => $validated['status']]);

        return response()->json([
            'message' => "$updated admins updated",
            'updated_count' => $updated,
        ]);
    }

    /**
     * Export activity logs
     */
    public function exportActivityLogs(Request $request)
    {
        $validated = $request->validate([
            'format' => 'required|in:csv,json',
            'start_date' => 'date|nullable',
            'end_date' => 'date|nullable',
        ]);

        $query = ActivityLog::with('user');

        if ($validated['start_date'] ?? null) {
            $query->whereDate('created_at', '>=', $validated['start_date']);
        }

        if ($validated['end_date'] ?? null) {
            $query->whereDate('created_at', '<=', $validated['end_date']);
        }

        $logs = $query->latest()->get();

        if ($validated['format'] === 'json') {
            return response()->json(['data' => $logs]);
        }

        // CSV export
        $headers = ['ID', 'User', 'Action', 'Model Type', 'Model ID', 'Date'];
        $data = $logs->map(fn($log) => [
            $log->id,
            $log->user->name,
            $log->action,
            $log->model_type,
            $log->model_id,
            $log->created_at,
        ]);

        return response()->streamDownload(function () use ($headers, $data) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, $headers);
            foreach ($data as $row) {
                fputcsv($handle, $row);
            }
            fclose($handle);
        }, 'activity-logs-' . now()->format('Y-m-d') . '.csv');
    }
}