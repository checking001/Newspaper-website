<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdminNotification;
use Illuminate\Http\Request;

class AdminNotificationController extends Controller
{
    /**
     * Get admin notifications
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $unreadOnly = $request->get('unread_only', false);

        $query = $user->notifications();

        if ($unreadOnly) {
            $query->where('is_read', false);
        }

        $notifications = $query->latest()->paginate($request->get('limit', 20));

        return response()->json([
            'data' => $notifications->items(),
            'unread_count' => $user->notifications()->where('is_read', false)->count(),
            'pagination' => [
                'total' => $notifications->total(),
                'per_page' => $notifications->perPage(),
                'current_page' => $notifications->currentPage(),
            ],
        ]);
    }

    /**
     * Mark notification as read
     */
    public function markAsRead(AdminNotification $notification)
    {
        $this->authorize('view', $notification);

        $notification->markAsRead();

        return response()->json([
            'message' => 'Notification marked as read',
        ]);
    }

    /**
     * Mark all as read
     */
    public function markAllAsRead()
    {
        auth()->user()->notifications()
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json([
            'message' => 'All notifications marked as read',
        ]);
    }

    /**
     * Delete notification
     */
    public function destroy(AdminNotification $notification)
    {
        $this->authorize('delete', $notification);

        $notification->delete();

        return response()->json([
            'message' => 'Notification deleted',
        ]);
    }

    /**
     * Clear all notifications
     */
    public function clearAll()
    {
        auth()->user()->notifications()->delete();

        return response()->json([
            'message' => 'All notifications cleared',
        ]);
    }
}