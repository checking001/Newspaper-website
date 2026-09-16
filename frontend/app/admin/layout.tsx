import { Metadata } from 'next'
import AdminSidebar from '../admin/AdminSidebar'
import AdminHeader from '../admin/AdminHeader'

export const metadata: Metadata = {
  title: 'Admin | খবরের কাগজ',
  robots: { index: false }
}

export default function AdminLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Header */}
        <AdminHeader />

        {/* Content */}
        <main className='flex-1 overflow-y-auto p-6'>{children}</main>
      </div>
    </div>
  )
}
