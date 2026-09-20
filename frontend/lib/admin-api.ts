const API_BASE = 'http://localhost:8000/api'

export const adminAPI = {
  // Dashboard
  getDashboardStats: async (token: string) => {
    const res = await fetch(`${API_BASE}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  },

  // Admin Management
  listAdmins: async (token: string, page = 1, limit = 15) => {
    const res = await fetch(`${API_BASE}/admins?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  },

  searchAdmins: async (
    token: string,
    search: string,
    role?: string,
    isActive?: boolean
  ) => {
    let url = `${API_BASE}/admin/search?search=${search}`
    if (role) url += `&role=${role}`
    if (isActive !== undefined) url += `&is_active=${isActive}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  },

  getAdmin: async (token: string, adminId: number) => {
    const res = await fetch(`${API_BASE}/admins/${adminId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  },

  createAdmin: async (token: string, data: any) => {
    const res = await fetch(`${API_BASE}/admins`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  updateAdmin: async (token: string, adminId: number, data: any) => {
    const res = await fetch(`${API_BASE}/admins/${adminId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  deleteAdmin: async (token: string, adminId: number) => {
    const res = await fetch(`${API_BASE}/admins/${adminId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  },

  toggleAdminStatus: async (token: string, adminId: number) => {
    const res = await fetch(`${API_BASE}/admins/${adminId}/toggle-status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  },

  resetAdminPassword: async (
    token: string,
    adminId: number,
    password: string,
    passwordConfirmation: string
  ) => {
    const res = await fetch(`${API_BASE}/admins/${adminId}/reset-password`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        password_confirmation: passwordConfirmation
      })
    })
    return res.json()
  },

  bulkToggleStatus: async (
    token: string,
    adminIds: number[],
    status: boolean
  ) => {
    const res = await fetch(`${API_BASE}/admin/bulk-toggle-status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        admin_ids: adminIds,
        status
      })
    })
    return res.json()
  },

  // Activity Logs
  getActivityLogs: async (token: string, page = 1, adminId?: number) => {
    let url = `${API_BASE}/admin/activity-report?page=${page}`
    if (adminId) url += `&admin_id=${adminId}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  },

  // Notifications
  getNotifications: async (token: string, unreadOnly = false) => {
    let url = `${API_BASE}/notifications`
    if (unreadOnly) url += '?unread_only=true'
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  },

  markNotificationAsRead: async (token: string, notificationId: number) => {
    const res = await fetch(
      `${API_BASE}/notifications/${notificationId}/read`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return res.json()
  },

  markAllNotificationsAsRead: async (token: string) => {
    const res = await fetch(`${API_BASE}/notifications/mark-all-read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  },

  deleteNotification: async (token: string, notificationId: number) => {
    const res = await fetch(`${API_BASE}/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  },

  // Profile
  getProfile: async (token: string) => {
    const res = await fetch(`${API_BASE}/admin/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  },

  updateProfile: async (token: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  // Permissions
  getPermissions: async (token: string) => {
    const res = await fetch(`${API_BASE}/admins/permissions/list`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
  }
}
